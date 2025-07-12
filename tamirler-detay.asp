<!-- Bismillahirrahmanirrahim -->
<!DOCTYPE html>
<html lang="tr"> 
    <head>
        <!-- #include file="include/inj.asp" -->
        <!-- #include file="include/sifreleme.asp" -->
        <!-- #include file="include/db.asp" -->
        <!-- #include file="include/admin-giriskontrol.asp" -->
        <!-- #include file="include/trcevir.asp" -->
        <!-- #include file="include/genel-fonksiyonlar.asp" -->
        <!-- #include file="include/fonksiyon/yetki-fonksiyon.asp" -->
		<!-- #include file="include/fonksiyon/secenekler.asp" -->
        <!-- #include file="include/Array/genel-durum.asp" -->
		<!-- #include file="include/Array/secenekler.asp" -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="google" content="notranslate" />
        <title>TAMİR DETAYI</title>
        <link rel="stylesheet" href="css/style.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/icofont.min.css<%=versiyon%>" />
		<link rel="stylesheet" href="css/form-control.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/select2.min.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/jquery.tagsinput-revisited.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/badge.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/button.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/accordion.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/responsive-tabs.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/sweetalert2.min.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/checkbox.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/table.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/notlar.css<%=versiyon%>" />
		<link rel="stylesheet" href="css/jquery.auto-complete.css<%=versiyon%>" />
		<link rel="stylesheet" href="js/datetimepicker/jquery.datetimepicker.min.css<%=versiyon%>" />
        <link rel="stylesheet" href="css/lightbox.css<%=versiyon%>" />
        <link rel="shortcut icon" href="images/favicon/tamirfav.png" />
        <script src="js/vendor.bundle.base.js<%=versiyon%>"></script>
        <script src="js/select2.min.js<%=versiyon%>"></script>
		<style>
#header-fixed{position:fixed;top:0px}
		</style>
	
    </head>
    <body><%
	anakategori="Tamirler"
	
	tamirid=Base64Decode(request.querystring("id"))
	id=injSayi(tamirid)
	if id=-99 then
	Redirect301("tamirler.asp?t="& ustmenu &"#tmrd1")
	end if
	
	
	set td=baglanti.execute("exec st_TamirDetay @tamirid='"&id&"'")
	if td.eof then
	Redirect301("tamirler.asp?t="& ustmenu &"#tmrd2")
	end if
	
	aracid=td("ar_id")
	fms_id=td("fms_id")
	fmusteri_adi=td("musteri_adi")
	
	'İŞ Emrini 60 dk sonra kapat
	'İşemri kapandığında malzeme silme problemi yaşanıyor 06.04.2023
	'baglanti.execute("update uye_acik_pencere set durum=2 where modul=3 and modul_alt=1	and id_bilgi=("& td("id") &") and DATEDIFF(minute,duzenleme_tarihi,GETDATE())>60 ")
	

'Session.Contents.Count
	
	set up=baglanti.execute("select up.uy_id,(u.ad+' '+u.soyad) as uye_ad,ISNULL(mevcut_durum,0) as mevcut_durum,up.durum from uye_acik_pencere as up left join uyeler as u on up.uy_id=u.id where up.durum=1 and up.modul=3 and up.modul_alt=1 and up.id_bilgi=("& td("id") &") order by up.durum asc ")
	if up.eof then
	penceredurum="Kapalı"
	inputreadonly="readonly"
	selectreadonly="disabled"
	else
		if up("uy_id")=Int(Session("perpid")) then
		penceredurum="Açık"		
		'Session("tamirperpacikpencere")=up("mevcut_durum")
		'inputreadonly="readonly"
		'selectreadonly="disabled"
		p=1'Düzenleme Aktif
		elseif up("uy_id")<>Int(Session("perpid")) then
		penceredurum="Başkasında"
		inputreadonly="readonly"
		selectreadonly="disabled"
		baskauyeacik=up("uye_ad")
		end if
	end if
	up.close
	set up=nothing
	
	'response.write "burak:"& Session("tamirperpacikpencere") &"<br><br>"
	

	
	
	'TAB SEÇİMİ
	tab=injSayi(request.querystring("d"))
	if Int(tab)=-99 then
	tab=1
	end if
	%>
	<div id="pencere_kapat" style="display:none2"><br /><br />
	<div class="container"><div class="row"><div class="col-lg-12 alert alert-warning">Bu işemri şuan farklı bir sekmede açık gözüküyor.<br />Aynı işemrini 2 sekmede açamazsınız.</div></div></div>
		<div class="formsatir">
		<%if ustmenu=1 then%>
		<a href="javascript:" data-id="<%=td("id")%>" data-kapat-url="tamirler-islem.asp" class="btn btn-lg lightkapat btn-secondary">Kapat</a>
		<div class="lightustkapat" style="top:5px"></div>
		<%end if%>
	</div>
	</div>
	
        <div class="container-scroller" id="pencere_ac">
            <!-- #include file="include/ust-menu.asp" -->
            <div class="container-fluid page-body-wrapper">
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-lg-12 no-padding">
                                <div class="card">
                                    <div class="govde-body">
                                        <h4 class="formbaslik">İŞ EMRİ DETAYI</h4>
										<input type="hidden" name="seciliautocomplete" />
                                    <form class="forms-sample formekle enteriptal" action="<%if YetkiDurum(Session("perpid"), anakategori, "Düzenle")=anakategori then%>/ISLEM/tamirler-islem.asp?t=<%=ustmenu%>&islem=duzenle<%end if%>" name="brkpanel" method="post" autocomplete="off">
										<input type="hidden" name="tamirid" id="tamirid" value="<%=td("id")%>" />
										<input type="hidden" name="ustmenu" id="ustmenu" value="<%=ustmenu%>" />
										<input type="hidden" name="tabmenu" id="tabmenu" value="<%=tab%>" />
										<input type="hidden" name="ien" id="tamirien" value="<%=td("ien")%>" />
										<input type="hidden" name="arac_degistirme" id="arac_degistirme" />
										<input type="hidden" name="musteri_degistirme" id="musteri_degistirme" />
										<input type="hidden" name="not_cevap" id="not_cevap" />
										<input type="hidden" name="exper_degistirme" id="exper_degistirme" />
										<input type="hidden" name="talep_degistirme" id="talep_degistirme" />
                                            <div>
                                                <div class="row">
                                                    <div class="col-md-8 col-xs-12">
                                                        <div class="row">
                                                            <div class="col-md-4 col-xs-6">
																<fieldset>
														<input type="text" id="arac" tabindex="1" value="<%=td("plaka")%>" name="plaka" data-url="json-arac.asp" readonly required maxlength="30" class="kmax autocomplete form-control plakasec" />
														<label for="plaka" class="stay">Plaka</label>
														<input type="hidden" id="arac_id" name="arac_id" value="<%=td("ar_id")%>" />
														<input type="hidden" id="arac_deger" name="arac_deger" value="<%=td("ar_id")%>" />
														<input type="hidden" id="arac_kdurum" name="arac_kdurum" class="autocompletedeger" value="-99" />
														<em class="autoicon" id="arac_icon"><i class="badge badge-secondary">KAYITLI</i></em>
																</fieldset>
                                                            </div>
                                                            <div class="col-md-4 col-xs-6">
																<fieldset <%if (ISNULL(td("km")) or td("km")="") then%>class="bosinput"<%end if%>>
																	<input type="text" name="km" id="km" maxlength="15" value="<%=Func_UcNokta(td("km"))%>" class="number-separator form-control" <%=inputreadonly%> required />
																	<label for="km" <%if (NOT ISNULL(td("km")) or td("km")<>"") then%>class="stay"<%end if%>>KM</label>
																</fieldset>
                                                            </div>
                                                            <div class="col-md-4 col-xs-12">
																<fieldset <%if (ISNULL(td("km")) or td("km")="") then%>class="bosinput"<%end if%>>
																	<select name="gelis_nedeni" id="gelis_nedeni" tabindex="3" required <%=selectreadonly%> id="gelis_nedeni">
                                                                        <option value="">Geliş Nedeni Seçiniz</option>
																		<%=Secenek_Fnk(2,"TAMİR GELİŞ NEDENİ")%>
                                                                    </select>
																	<label for="gelis_nedeni" class="stay">Geliş Nedeni</label>
																	<script type="text/javascript">document.getElementById("gelis_nedeni").value = "<%=td("gelis_nedeni")%>";</script>
																</fieldset>
                                                            </div>
														</div>
														<div class="row">
															<div class="col-md-9 col-xs-12">
																<fieldset>
																	<select class="form-control faturasablon" name="sablon" multiple="multiple">
																	<%
																	if penceredurum<>"Kapalı" then
																	set fs=baglanti.execute("Exec st_FaturaSablon @sablonidler='"& td("sablon") &"'")
																	do while not fs.eof%>
																	
																	<option value="<%=fs("id")%>" selected="selected"><%=fs("sablon_adi")%></option><%
																	fs.movenext:loop
																	fs.close
																	set fs=nothing
																	end if%>
																	</select>
																	<label for="sablon" class="stay">Kontrol Listesi</label>
																</fieldset>
															</div>
															<div class="col-md-3 col-xs-12" style="padding-top:6px">
																<div class="form-check form-check-flat form-check-danger">
																<label class="form-check-label" style="font-weight:bold;cursor:pointer;background-color:#<%if penceredurum="Açık" then%>ff4747<%else%>000<%end if%>;padding:0px 5px;color:#FFF" <%if td("rnd_id")>1 then%>onclick="window.open('https://www.pratikaraba.com/panel/pjet-randevu-detayi.asp?id=<%if Cdbl(td("pa_id"))=1 then%>0<%else%><%=td("pa_id")%><%end if%>&rid=<%=td("rnd_id")%>&y=1')"<%end if%>>
																	<input type="checkbox" name="pratik_araba"<%if penceredurum<>"Açık" then%> disabled<%end if%> <%if td("rnd_id")>0 then%> checked<%end if%> value="<%if td("pa_id")>0 then%><%=td("pa_id")%><%else%>1<%end if%>" class="form-check-input">
																	<%if td("rnd_id")<2 then%>Pratik Araba<%else%>Pratik Teklif<%end if%>
																<i class="input-helper"></i></label>
																</div>
															</div>
															
                                                        </div>
                                                        <div class="form-group row">
                                                            <table class="responsivetable">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="col" class="d-xs-none table-primary">IEN</th>
                                                                        <td data-label="Kayıt Tarihi:" class="table-primary" id="ien_bilgi"><%=td("ien")%></td>
																		<td scope="col" class="d-xs-none table-warning"><b>Açılış Tarihi</b></td>
                                                                        <td data-label="Kayıt Tarihi:" class="table-warning" id="acilis_tarihi"><%=Left(td("kayit_tarihi"),10)%></td>
                                                                        <th scope="col" class="d-xs-none table-danger">Kapanış Tarihi</th>
                                                                        <td data-label="Kapanış Tarihi:" class="table-danger" id="kapanis_tarihi"><%=Left(td("kapanis_tarihi"),10)%></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4 col-xs-12">
														<table class="responsivetable tamirhesap">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="col"></th>
																		<th scope="col">Malzeme:</th>
																		<th scope="col">İşçilik:</th>
                                                                    </tr><%
																	if YetkiDurum(Session("perpid"), anakategori, "Maliyet")=anakategori then%>
                                                                    <tr>
                                                                        <th scope="col">Maliyet</th>
																		<td scope="col" class="isemri_malzememaliyet"><%=FormatNumber(td("kdvli_malzeme_maliyet"),2)%></td>
																		<td scope="col" class="isemri_iscilikmaliyet"><%=FormatNumber(td("kdvli_iscilik_maliyet"),2)%></td>
                                                                    </tr><%
																	end if%>
                                                                    <tr>
                                                                        <th scope="col">Satış</th>
																		<td scope="col" class="isemri_malzemetoplam"><%=FormatNumber(td("kdvsiz_malzeme_satis"),2)%></td>
																		<td scope="col" class="isemri_isciliktoplam"><%=FormatNumber(td("kdvsiz_iscilik_satis"),2)%></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">KDV</th>
																		<td scope="col" class="isemri_malzemekdv"><%=FormatNumber(td("malzeme_satis_kdv"),2)%></td>
																		<td scope="col" class="isemri_iscilikkdv"><%=FormatNumber(td("iscilik_satis_kdv"),2)%></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Tahakkuk</th>
																		<td scope="col" class="isemri_tahakkuk"><%=FormatNumber(td("toplam_tahakkuk"),2)%></td>
																		<td scope="col" class="isemri_kdvsiztahakkuk"><%=FormatNumber(Cdbl(td("toplam_tahakkuk"))-Cdbl(td("iscilik_satis_kdv")),2)%></td>
                                                                    </tr>
                                                                </tbody>
                                                        </table>
														
														

														<div style="position:absolute;right:10px;margin-top:15px">
<div class="form-check form-check-flat form-check-danger">
																<label class="form-check-label" style="font-weight:bold;cursor:pointer;background-color:#000;padding:0px 5px;color:#FFF;margin-right:10px">
																	<input type="checkbox" name="etmr_id"<%if penceredurum<>"Açık" then%> disabled<%end if%> <%if td("etmr_id")>0 then%> checked<%end if%> value="<%if td("etmr_id")>0 then%><%=td("etmr_id")%><%else%>1<%end if%>" class="form-check-input">
																	Tekrarlanan İşemri
																<i class="input-helper"></i></label>
																</div>
														
														<%if YetkiDurum(Session("perpid"), anakategori, "Açılış Yazdır")=anakategori then%><a href="javascript:" class="btn btn-lg btn-info swalyazdir" durum="<%=td("durum")%>" idbilgi="<%=td("id")%>" title="İşemri Yazdır"> Yazdır</a><%end if%></div>
                                                    </div>
                                                </div>

<div style="margin-bottom:-80px;padding:20px" id="genel_marka_model">Marka Yükleniyor</div>
                                                <ul class="rtabs">
                                                    <li id-bilgi="1"<%if tab=1 then%> class="selected"<%end if%>><a class="tab1baslik" href="javascript:" tab=""></a></li>
													<li id-bilgi="8"<%if tab=8 then%> class="selected"<%end if%>><a class="tab8baslik" href="javascript:" tab="tab-bakim-gecmisi.asp?p=<%=p%>&plk=<%=td("plaka")%>"></a></li>
                                                    <%if YetkiDurum(Session("perpid"), anakategori, "İşlemler")=anakategori then%><li id-bilgi="2"<%if tab=2 then%> class="selected"<%end if%>><a class="tab2baslik" href="javascript:" tab="tab-musteri-talepleri.asp?p=<%=p%>&id=<%=td("id")%>&mdl=<%=td("arac_model")%>&arc=<%=td("ar_id")%>&t=<%=ustmenu%>&fr=<%=td("ms_id")%>&drm=<%=td("durum")%>"> <%
													if td("talep_sayisi")>0 then%><span class="badge badge-success"><%=td("talep_sayisi")%></span><%end if%></a></li>
                                                    <li id-bilgi="3"<%if tab=3 then%> class="selected"<%end if%>><a class="tab3baslik tabbos" href="javascript:" tab="tab-malzeme-listesi.asp?p=<%=p%>&id=<%=td("id")%>&fr=<%=td("ms_id")%>&drm=<%=td("durum")%>"> <%
													if Cdbl(td("ihtiyac_sayisi"))>0 then%><span class="badge badge-success" id="toplamihtiyac"><%=td("ihtiyac_sayisi")%></span><%end if%></a></li><%end if%>
                                                    <%if YetkiDurum(Session("perpid"), anakategori, "Notlar")=anakategori then%><li id-bilgi="4"<%if tab=4 then%> class="selected"<%end if%>><a class="tab4baslik" href="javascript:" tab="tab-tamir-notlari.asp?p=<%=p%>&id=<%=td("id")%>&ar=<%=td("ar_id")%>"> <%
													if td("not_sayisi")>0 then%><span class="badge badge-success"><%=td("not_sayisi")%></span><%end if%></a></li><%end if%>
                                                   
                                                    <%if YetkiDurum(Session("perpid"), anakategori, "Ekspertiz")=anakategori then%><li id-bilgi="6"<%if tab=6 then%> class="selected"<%end if%> <%if td("gelis_nedeni")<>10 then%>style="display:none"<%end if%>><a class="tab6baslik tabbos" href="javascript:" tab="tab-ekspertiz.asp?p=<%=p%>&id=<%=td("id")%>"></a></li><%end if%>
                                                    <%if YetkiDurum(Session("perpid"), anakategori, "İ.H.")=anakategori then%><li id-bilgi="7"<%if tab=7 then%> class="selected"<%end if%>><a class="tab7baslik" href="javascript:" tab="tab-islem-hareketleri.asp?p=<%=p%>&id=<%=td("id")%>"></a></li><%end if%>
                                                </ul>
                                                <div class="panel-container tabicerik">
                                                    <div id="tab1" class="hidden">
														<!-- #include file="TAB-MENU/tab-musteri-arac.asp" -->
													</div>
                                                    <div id="tab2" class="hidden"></div>
													<div id="tab8" class="hidden"></div>
                                                    <div id="tab3" class="hidden"></div>
                                                    <div id="tab4" class="hidden"></div>
                                                    <div id="tab6" class="hidden"></div>
                                                    <div id="tab7" class="hidden"></div>
                                                </div>

                                                <div class="formsatir">
                                                    <div style="float:left">
													
														
													<%if YetkiDurum(Session("perpid"), anakategori, "Düzenle")=anakategori then%>	
															<%if penceredurum="Kapalı" then%>
																<%if YetkiDurum(Session("perpid"), anakategori, "İen Aç")=anakategori then%>
																	<a href="/ISLEM/tamirler-islem.asp?islem=tamirac&t=<%=ustmenu%>&id=<%=td("id")%>" class="btn btn-lg btn-success mobilm10" id="btn_isemriac" <%if td("durum")<>5 then%>style="display:none"<%end if%>>İş Emri Aç</a>
																<%end if%>
															<a href="javascript:" url="/ISLEM/tamirler-islem.asp?islem=yetkiduzenle&t=<%=ustmenu%>&id=<%=td("id")%>" class="btn btn-lg btn-warning" id="btn_isemriduzenle" <%if td("durum")=5 then%>style="display:none"<%end if%>>İşemri Düzenle</a>
															<%elseif penceredurum="Açık" then%>
															<button type="submit" class="btn btn-lg kaydet btn-success">İşemri Kaydet</button>
															<%elseif penceredurum="Başkasında" then%>
															<button type="button" class="btn btn-lg btn-danger" title="<%=baskauyeacik%>">Başkasında Açık</button>
															<%end if%>
													<%end if%>
													
													<%if ustmenu=1 then%>
													<a href="javascript:" data-id="<%=td("id")%>" data-kapat-url="tamirler-islem.asp" data-ozel="<%=inj(request.querystring("ozel"),0)%>" class="btn btn-lg lightkapat btn-secondary">Kapat</a>
													<div class="lightustyenikapat" data-id="<%=td("id")%>" data-kapat-url="tamirler-islem.asp" data-ozel="<%=inj(request.querystring("ozel"),0)%>"></div>
													<%
													end if%>
													
													
													</div>
													
													
													<%if penceredurum="Kapalı" then%>
													<div style="float:right">
													
														
													<div id="btnlar_kapali" <%if td("durum")<>5 then%>style="display:none"<%end if%>>
													
													<%if YetkiDurum(Session("perpid"), anakategori, "Fatura Aktar")=anakategori then%>
													<%
													if td("fatura_id")=0 then%>
                                                    <a href="javascript:" onclick="IframeLightBox('fatura-aktar.asp?id=<%=td("id")%>&g=<%=td("gelis_nedeni")%>')" class="btn btn-md btn-warning" id="faturaaktar">Fatura'ya Aktar</a><%
													else%>
													<a href="javascript:" onclick="IframeLightBox('muh-tekrar-faturalandir.asp?tmr=<%=td("id")%>&fr=<%=td("fms_id")%>&sgr=<%=td("sgr_id")%>')" class="btn btn-md btn-warning">Tekrar Faturalandır</a>
													
													<a href="javascript:" onclick="IframeLightBox('muh-gelir-fatura-detay.asp?id=<%=td("fatura_id")%>&ien=1')" class="btn btn-md btn-success">Fatura'ya Git</a><%
													end if%>
													<%end if%>
													
													<%if YetkiDurum(Session("perpid"), "Görev Listesi", "Ekle")="Görev Listesi" then%>
													<%
													if td("gorev_id")=0 then%>
													<a href="javascript:" onclick="IframeLightBox('tamir-gorev-ekle.asp?id=<%=td("id")%>')" class="btn btn-md btn-primary" id="odemetaahhut">Ödeme Taahhüt</a><%
													else%>
													<a href="javascript:" onclick="IframeLightBox('gorev-detay.asp?id=<%=Base64Encode(td("gorev_id"))%>')" class="btn btn-md btn-warning">Taahhüt'ü İncele</a>
													<%end if%>
													<%end if%>
													
													<%if YetkiDurum(Session("perpid"), "Muh. Kasalar", "Kasa Girişi")="Muh. Kasalar" then%>
													<a href="javascript:" onclick="IframeLightBox('para-giris.asp?tmr=<%=td("id")%>')" class="btn btn-md btn-success">Kasa Girişi</a>
													<%end if%>
													</div>
													</div><%
													end if%>
													<div style="clear:both"></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><%
					td.close
					set td=nothing%>
                    <!-- #include file="include/alt-menu.asp" -->
                </div>
            </div>
        </div>
		
        <script defer src="js/off-canvas.js<%=versiyon%>"></script>
        <script defer src="js/hoverable-collapse.js<%=versiyon%>"></script>
        <%if mobil_kontrol="mobil" then%><script defer src="js/template.js<%=versiyon%>"></script><%end if%>
        <script defer src="js/settings.js<%=versiyon%>"></script>
        <script defer src="js/todolist.js<%=versiyon%>"></script>
        <script defer src="js/jquery.mask.min.js<%=versiyon%>"></script>
        <script defer src="js/jquery.validate.min.js<%=versiyon%>"></script>
        <script defer src="js/bootstrap-maxlength.min.js<%=versiyon%>"></script>
		<script defer src="js/jquery.auto-complete.min.js<%=versiyon%>"></script>
		<script defer src="js/autocomplete.js<%=versiyon%>"></script>
        <script defer src="js/brk-autocomplete.js<%=versiyon%>"></script>
        <script defer src="js/bt-maxLength.js<%=versiyon%>"></script>
        <script defer src="js/responsive-tabs.js<%=versiyon%>"></script>
        <script defer src="js/ajax-error.js<%=versiyon%>"></script>
		<script defer src="js/enter-iptal.js<%=versiyon%>"></script>
        <script defer src="js/form-validation.js<%=versiyon%>"></script>
        <script defer src="js/form-input.js<%=versiyon%>"></script>
        <script defer src="js/tinybox.js<%=versiyon%>"></script>
        <script defer src="js/sweetalert2.min.js<%=versiyon%>"></script>
		<script defer src="js/parabirimi.js<%=versiyon%>"></script>
		<script defer src="js/tumunu-sec.js<%=versiyon%>"></script>
		<script defer src="js/datetimepicker/jquery.datetimepicker.full.min.js<%=versiyon%>"></script>     
		<script defer src="js/tamir-islem.js<%=versiyon%>"></script>
        <script defer src="js/tamir-detay.js<%=versiyon%>"></script>
		<script defer src="js/kontrol/firma-kontrol.js<%=versiyon%>"></script>
		<script defer src="js/kontrol/arac-kontrol.js<%=versiyon%>"></script>
		<script defer>	
let localStorageTimeout = 15 * 1000; // 15,000 milliseconds = 15 seconds.
let localStorageResetInterval = 10 * 1000; // 10,000 milliseconds = 10 seconds.
let localStorageTabKey = 'test-application-browser-tab-<%=id%>';
let sessionStorageGuidKey = 'browser-tab-guid-<%=id%>';

function createGUID() {
  let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /*eslint-disable*/
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
	  
    /*eslint-enable*/
    return v.toString(16);
  });
  //console.log(guid+'--'+<%=Len(id)%>+'--'+<%=id%>+'--'+guid.substring(0,36-<%=Len(id)%>)+'<%=id%>');
  return guid.substring(0,36-<%=Len(id)%>)+'<%=id%>';
}
/*
window.onunload = () => { 
 				localStorage.removeItem(localStorageTabKey);
      };*/

window.onload = () => {
	console.log(document.getElementById("genel_marka_model"));
    const kontrolEt = setInterval(() => {
        const markaModel = document.getElementById("marka_model");
        const gelenModel = document.getElementById("genel_marka_model");

        if (markaModel && gelenModel && markaModel.innerText.trim() !== '') {
            gelenModel.innerText = markaModel.innerText;
            clearInterval(kontrolEt);
        }
    }, 300);
};

function testTab() {
  let sessionGuid = sessionStorage.getItem(sessionStorageGuidKey) || createGUID();
  let tabObj = JSON.parse(localStorage.getItem(localStorageTabKey)) || null;

  sessionStorage.setItem(sessionStorageGuidKey, sessionGuid);

  // If no or stale tab object, our session is the winner.  If the guid matches, ours is still the winner
  //console.log(tabObj+'--'+tabObj.guid+'----'+sessionGuid);
  if (tabObj === null || (tabObj.timestamp < new Date().getTime() - localStorageTimeout) || tabObj.guid === sessionGuid) {
    function setTabObj() {
      let newTabObj = {
        guid: sessionGuid,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(localStorageTabKey, JSON.stringify(newTabObj));
    }
    setTabObj();
    setInterval(setTabObj, localStorageResetInterval);
    return true;
  } else {
    return false;
  }
 
}


if (testTab()) {
	document.title = 'Aktif Tamir';
	$("#pencere_kapat").css('display','none');
	$("#pencere_ac").css('display','');
	console.log('aktif');
} else {
	document.title = 'Pasif Tamir';	
	$("#pencere_kapat").css('display','');
	$("#pencere_ac").css('display','none');
	console.log('pasif');
}

	
		</script>
        <!-- #include file="include/db-kapat.asp" -->
    </body>
</html>
