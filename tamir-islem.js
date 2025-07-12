function HariciFocusOut(idbilgi){
				var arac_deger=$("input[name=arac_deger]").val();
				
				if (idbilgi.substring(0,6)=='stk_id'){
					var islemidsi=idbilgi.substring(6,96);
					var idbilgisi=$("#"+ idbilgi +"_deger").val();
					if(idbilgisi==''){
						$("#talep_sutun"+ islemidsi +" #barkodbilgi"+ islemidsi +"").css('display','none');
						$("#talep_sutun"+ islemidsi +" input[name=min_kar]").val('1');
						$("#talep_sutun"+ islemidsi +" input[name=kdv]").val('1.20');
						$("#talep_sutun"+ islemidsi +" input[name=kdv_tur]").val('6');
						$("#talep_sutun"+ islemidsi +" input[name=birim_maliyet]").val('');
						$("#talep_sutun"+ islemidsi +" .topmaliyet").html('0');
						$("#talep_sutun"+ islemidsi +" .birimkdvli_maliyet").html('0');
						$("#talep_sutun"+ islemidsi +" .topkdvlimaliyet").html('0');
						$("#talep_sutun"+ islemidsi +" input[name=miktar]").val('1');
						$("#talep_sutun"+ islemidsi +" input[name=maliyet_kdv]").val('0');
						$("#talep_sutun"+ islemidsi +" input[name=birim_fiyat]").val('');
						$("#talep_sutun"+ islemidsi +" .topfiyat").html('0');
						$("#talep_sutun"+ islemidsi +" .birimkdvli_fiyat").html('0');
						$("#talep_sutun"+ islemidsi +" .topkdvlifiyat").html('0');
						$("#talep_sutun"+ islemidsi +" input[name=birim_kdv]").val('0');
						//$("#talep_sutun"+ islemidsi +" #tur"+ islemidsi +"").val('1');
						$("#talep_sutun"+ islemidsi +" input[name=birim_tahakkuk]").val('');
						$("#talep_sutun"+ islemidsi +" .toptahakkuk").html('0');
						$("#talep_sutun"+ islemidsi +" .topkdvsiztahakkuk").html('0');
						$("#talep_sutun"+ islemidsi +" .topiskonto_orani").html('0');
						$("#talep_sutun"+ islemidsi +" input[name=toplam_kdvsiztahakkuk]").val('0');
						$("#talep_sutun"+ islemidsi +" input[name=toplam_tahakkuk]").val('0');
						$("#talep_sutun"+ islemidsi +" input[name=iskonto_orani]").val('0');
						$("#talep_sutun"+ islemidsi +" input[name=iskonto]").val('0');
						$("#talep_sutun"+ islemidsi +" .tmiktar").addClass('hidden');
						$("#talep_sutun"+ islemidsi +" .tmiktar").html('9999');
					}
					else{
						
					var stokgiris;
					stokgiris=$.ajax({
							type: "POST",
							async : false,
							//cache: false,
							data: {stokid:idbilgisi},
							url: 'JSON/JSON-stok-bilgi.asp',
								success: function(response){
									data = $.parseJSON(response);
									
									if(data.tur==1 && parseFloat(data.birim_maliyet)<0.1){
										Swal.fire({
												icon: 'danger',
												title: 'Dikkat !!!',
												html: '<b style="color:#c90000">'+ data.stok_kodu +'</b> stok kartı maliyeti 0 TL olarak gözüküyor.<br>Maliyet 0 TL olan stok kartlarında işlem yapamazsınız !!!'
											})
										$("#talep_sutun"+ islemidsi +" input[name=stk_id]").val('');
										$("#talep_sutun"+ islemidsi +" input[name=stk_id_deger]").val('');
										$("#talep_sutun"+ islemidsi +" input[name=stk_id_kdurum]").val('');
										$("#talep_sutun"+ islemidsi +" #"+ idbilgi +"_icon").html('<i class="icofont-search-2"></i>');
										return false
									}
									
						$("#talep_sutun"+ islemidsi +" #barkodbilgi"+ islemidsi +"").css('display','');
						$("#talep_sutun"+ islemidsi +" #barkodbilgi"+ islemidsi +"").html('Kodu:'+ data.stok_kodu +' / Barkod:'+ data.barkod +' / Raf:'+ data.raf);			
						$("#talep_sutun"+ islemidsi +" input[name=min_kar]").val(data.min_kar);
						$("#talep_sutun"+ islemidsi +" input[name=kdv]").val(data.kdv);
						$("#talep_sutun"+ islemidsi +" input[name=kdv_tur]").val(data.kdv_tur);
						$("#talep_sutun"+ islemidsi +" input[name=birim_maliyet]").val(data.birim_maliyet);
						$("#talep_sutun"+ islemidsi +" .topmaliyet").html(data.birim_maliyet);
						$("#talep_sutun"+ islemidsi +" .birimkdvli_maliyet").html(data.kdvli_maliyet);
						$("#talep_sutun"+ islemidsi +" .topkdvlimaliyet").html(data.kdvli_maliyet);
						if(data.tur==1 && data.stok_adet<1){
						$("#talep_sutun"+ islemidsi +" input[name=miktar]").val('0');
						}else{
						$("#talep_sutun"+ islemidsi +" input[name=miktar]").val('1');	
						}
						$("#talep_sutun"+ islemidsi +" input[name=maliyet_kdv]").val(data.maliyet_kdv);
						$("#talep_sutun"+ islemidsi +" input[name=birim_fiyat]").val(data.birim_fiyat);
						$("#talep_sutun"+ islemidsi +" .topfiyat").html(data.birim_fiyat);
						$("#talep_sutun"+ islemidsi +" .birimkdvli_fiyat").html(data.kdvli_fiyat);
						$("#talep_sutun"+ islemidsi +" .topkdvlifiyat").html(data.kdvli_fiyat);
						$("#talep_sutun"+ islemidsi +" input[name=birim_kdv]").val(data.birim_kdv);
						//$("#talep_sutun"+ islemidsi +" #tur"+ islemidsi +"").val(data.tur);
						$("#talep_sutun"+ islemidsi +" input[name=birim_tahakkuk]").val(data.kdvli_fiyat);
						$("#talep_sutun"+ islemidsi +" .toptahakkuk").html(data.kdvli_fiyat);
						$("#talep_sutun"+ islemidsi +" .topkdvsiztahakkuk").html(data.birim_fiyat);
						$("#talep_sutun"+ islemidsi +" .topiskonto_orani").html('0');
						$("#talep_sutun"+ islemidsi +" input[name=toplam_tahakkuk]").val(data.kdvli_fiyat);
						$("#talep_sutun"+ islemidsi +" input[name=toplam_kdvsiztahakkuk]").val(data.birim_fiyat);
						$("#talep_sutun"+ islemidsi +" input[name=iskonto_orani]").val('0');
						$("#talep_sutun"+ islemidsi +" input[name=iskonto]").val('0');
						
						
						if(data.tur==1){
							$("#talep_sutun"+ islemidsi +" .tmiktar").removeClass('hidden');
							$("#talep_sutun"+ islemidsi +" .tmiktar").html(data.stok_adet);
							if(data.kritik_durum==1){
								$("#talep_sutun"+ islemidsi +" .tmiktar").addClass('tkritik');
							}else{
								$("#talep_sutun"+ islemidsi +" .tmiktar").removeClass('tkritik');
							}
						}	
								},
								error: function (jqXHR, exception) {
									getErrorMessage(jqXHR, exception);
								}
							});
							try{stokgiris.abort()}catch(e){}
					}		
					
				}
				
				
				if (idbilgi=='arac') {					
				$("label[for=km], label[for=sase],  label[for=ruhsat_sahibi], label[for=gsm], label[for=app_telefon1], label[for=app_telefon2], label[for=app_telefon3], label[for=telefon], label[for=eposta], label[for=ilce],  label[for=musteri_adi], label[for=tckimlik], label[for=unvan], label[for=vergid], label[for=vergin], label[for=model_uzanti], label[for=kw_bilgi]").removeClass('stay');
				
				$("input[name=sase], input[name=yetkili], input[name=ruhsat_sahibi], input[name=gsm], input[name=app_telefon1], input[name=app_telefon2], input[name=app_telefon3], input[name=telefon], input[name=eposta], input[name=ilce], input[name=sehir],  input[name=musteri_adi], input[name=tckimlik], input[name=unvan], input[name=vergid], input[name=vergin], textarea[name=adres], input[name=lastik_ebadi], input[name=model_uzanti], input[name=kw_bilgi]").prop('readonly', false);
				
				$("#lastik_ebadi, #musteri_adi").addClass('autocomplete');
				
				$("select[name=arac_tip], select[name=yakit_tipi], select[name=triger_durum], select[name=vites_tipi]").removeClass('pasifselect');
				//$("select[name=arac_tip], select[name=yakit_tipi], select[name=triger_durum], select[name=vites_tipi]").prop('disabled', false);
				
				$("#lastik_ebadi_icon").html('<i class="icofont-search-2"></i>');
				$("#musteri_adi_icon").html('<i class="icofont-search-2"></i>');
				
				
				$(".arcdetay").css('display','none');
				$(".arcirtibat").css('display','none');
				$(".musdetay").css('display','none');
				$(".musefatura").css('display','none');
				$(".musdegistir").css('display','none');
				
				
				var tarih = new Date()
				var zaman=('00'+(tarih.getDate()+1)).substr(('00'+tarih.getDate()).length-2)+'.'+ ('00'+(tarih.getMonth()+1)).substr(('00'+tarih.getMonth()).length-2)+'.'+tarih.getFullYear();

				$("#sase").val('');
				$("#km").val('');
				$("#pa_id").val('');
				$("#son_km").val('');
				$("#arac_tip").val(0);
				$("#arac_kayit_tarihi").val(zaman);
				$("#ien_sayi").val(0);
				$("#marka_model").html('');
				$("#model_uzanti").val('');
				
				$("#select2-marka-container").html('Marka Seçiniz');
				$("#marka").find('option:selected').text('Marka Seçiniz');
				$("#marka").find('option:selected').val('');
				
				
				$("#select2-seri-container").html('Seri Seçiniz');
				$("#seri").find('option:selected').text('Seri Seçiniz');
				$("#seri").find('option:selected').val(-99);
				
				$("#select2-yil-container").html('Model Yılı Seçiniz');
				$("#yil").find('option:selected').text('Model Yılı Seçiniz');
				$("#yil").find('option:selected').val(-99);
				
				$("#select2-model-container").html('Model Seçiniz');
				$("#model").find('option:selected').text('Model Seçiniz');
				$("#model").find('option:selected').val(-99);
				
				$("#select2-yakit-container").html('Yakıt Tipi Seçiniz');
				$("#yakit").find('option:selected').text('Yakıt Tipi Seçiniz');
				$("#yakit").find('option:selected').val(-99);
				$("#marka").prop('disabled', false);
				
				$("input[name=arac_model]").val('');
				
				$("#triger_durum").val('0');
				$("#vites_tipi").val('');
				$("#lastik_ebadi").val('');
				$("#lastik_ebadi_deger").val('');
				$("#lastik_ebadi_kdurum").val('');
				$("#musteri_kodu").val('');
				$("#tur1").prop("checked", true);
				$("#unvan").val('');
				$("#yetkili").val('');
				$("#vergid").val('');
				$("#vergin").val('');
				$("#eskims_id").val('');
				$("#musteri_adi").val('');
				$("#musteri_adi_deger").val('');
				$("#musteri_adi_kdurum").val('');				
				$("#ruhsat_sahibi").val('');
				$("#tckimlik").val('');
				$("#gsm").val('');
				$("#app_telefon1").val('');
				$("#app_telefon2").val('');
				$("#app_telefon3").val('');
				$("#kw_bilgi").val('');
				$("#telefon").val('');
				$("#eposta").val('');
				$("#adres").val('');
				$("#ilce").val('');
				$("#sehir").val('İstanbul');
				$("#son_ien_tarih").val('');
				$("#kayit_tarihi").val('');
				$("#bakiye").val(0);
				$("#bireysel").css("display", "block");
                $("#kurumsal").css("display", "none");
				
				
					if(arac_deger!=''){
					$("#lastik_ebadi, #musteri_adi").removeClass('autocomplete');
					
					setTimeout(function(){
					var tamirvarmiyokmu;
					tamirvarmiyokmu=$.ajax({
							type: "POST",
							async : false,
							//cache: false,
							url: "JSON/JSON-tamir-varmi-yokmu.asp",
							data:'arc='+arac_deger,
								success: function(response){
									if(response!=''){
										Swal.fire({
											icon: 'warning',
											title: 'Dikkat !!!',
											html: 'Bu araca ait <b style="color:#c90000">'+ response +'</b> nolu iş emri halen açık gözükmektedir !!!'
										})
									}
								},
								error: function (jqXHR, exception) {
									getErrorMessage(jqXHR, exception);
								}
							});
							try { tamirvarmiyokmu.abort(); } catch(e){}
						}, 100);
				
					setTimeout(function(){
					var tamirauto;
					tamirauto=$.ajax({
							type: "POST",
							async : false,
							//cache: false,
							url: "JSON/JSON-arac-firma-bilgi.asp",
							data:'arc='+arac_deger,
								success: function(response){
									if(response!=''){
									data = $.parseJSON(response);
									
									//Firma Engel Kontrol
									if(data.engel_durum==2){
										Swal.fire({
											icon: 'error',
											title: 'Engelli !!!',
											html: data.engel_mesaj
										})
										$("#arac").val('');
										$("#arac_deger").val('');
										$("#arac_kdurum").val('');
										$("#arac_icon").html('<i class="icofont-search-2"></i>');
										return false
									}
									
									//Araç Durum Kontrol
									if(data.arc_durum==2){
										Swal.fire({
											icon: 'warning',
											title: 'Uyarı !!!',
											html: 'Bu plakalı araç zaten mevcut Araç listesinden kontrol etmelisiniz'
										})
										$("#arac").val('');
										$("#arac_deger").val('');
										$("#arac_kdurum").val('');
										$("#arac_icon").html('<i class="icofont-search-2"></i>');
										return false
									}
									
									if(data.engel_mesaj!=''){
										Swal.fire({
											icon: 'warning',
											title: 'Dikkat !!!',
											html: data.engel_mesaj
										})
										//return false
									}
									
									$("label[for=km], label[for=sase], label[for=yetkili], label[for=ruhsat_sahibi], label[for=gsm], label[for=app_telefon1], label[for=app_telefon2], label[for=app_telefon3], label[for=telefon], label[for=eposta], label[for=ilce], label[for=sehir], label[for=musteri_adi], label[for=tckimlik], label[for=unvan], label[for=vergid], label[for=vergin], label[for=model_uzanti], label[for=kw_bilgi]").addClass('stay');
									
									$("input[name=sase], input[name=yetkili], input[name=ruhsat_sahibi], input[name=gsm], input[name=app_telefon1], input[name=app_telefon2], input[name=app_telefon3], input[name=kw_bilgi], input[name=telefon], input[name=eposta], input[name=ilce], input[name=sehir],  input[name=musteri_adi], input[name=tckimlik], input[name=unvan], input[name=vergid], input[name=vergin], textarea[name=adres], input[name=lastik_ebadi]").prop('readonly', true);
									
									$("#marka, #seri, #model, #yil, #yakit").prop('disabled', false);
									
									$("select[name=arac_tip], select[name=yakit_tipi], select[name=triger_durum], select[name=vites_tipi]").addClass('pasifselect');
									//$("select[name=arac_tip], select[name=yakit_tipi], select[name=triger_durum], select[name=vites_tipi]").prop('disabled', true);
									
									$("#lastik_ebadi_icon").html('<i class="badge badge-secondary">KAYITLI</i>');
									$("#musteri_adi_icon").html('<i class="badge badge-secondary">KAYITLI</i>');
									
									$(".arcdetay").css('display','');
									$(".arcdetay").attr('onclick','IframeLightBox(\'araclar-detay.asp?id='+data.arc_id_enc+'\')');
									
									$(".arcirtibat").css('display','');
									$(".arcirtibat").attr('onclick','IframeLightBox(\'araclar-detay.asp?d=8&amp;id='+data.arc_id_enc+'\')');
									
									$(".musdetay").css('display','');
									$(".musdetay").attr('onclick','IframeLightBox(\'firmalar-detay.asp?id='+data.ms_id_enc+'\')');
									$(".musefatura").css('display','');
									$(".musdegistir").css('display','');
									
									$("#arac_icon").html('<i class="badge badge-secondary">KAYITLI</i>');
									
									$("#sase").val(data.sase);
									$("#tip").val(data.tip);
									$("#arac_kayit_tarihi").val(data.arac_kayit_tarihi);
									$("#ien_sayi").val(data.ien_sayi);
									$("#marka_model").html(data.marka_full);
									$("#model_uzanti").val(data.model_uzanti);
									
									
									if(data.arac_model!='0'){
									$("#marka").val(data.marka_deger_enc).trigger("change");
									$("#seri").val(data.model_deger_enc).trigger("change");
									$("#yil").val(data.yil_deger_enc).trigger("change");
									$("#model").val(data.motor_gucu_deger_enc).trigger("change");
									$("#yakit").val(data.yakit_tipi_enc).trigger("change");
									
									$("#select2-marka-container").html(data.marka);
									$("#marka").find('option:selected').text(data.marka_deger);
									$("#marka").find('option:selected').val(data.marka_deger);
				
									$("#select2-seri-container").html(data.model);
									$("#seri").find('option:selected').text(data.model);
									$("#seri").find('option:selected').val(data.model_deger_enc);
									
									$("#select2-yil-container").html(data.yil);
									$("#yil").find('option:selected').text(data.yil);
									$("#yil").find('option:selected').val(data.yil_deger_enc);
									
									$("#select2-model-container").html(data.motor_gucu);
									$("#model").find('option:selected').text(data.motor_gucu);
									$("#model").find('option:selected').val(data.motor_gucu_deger_enc);
									
									$("#select2-yakit-container").html(data.yakit_tipi);
									$("#yakit").find('option:selected').text(data.yakit_tipi);
									$("#yakit").find('option:selected').val(data.yakit_tipi_deger_enc);
									$("#marka, #seri, #model, #yil, #yakit").prop('disabled', true);
									$("input[name=model_uzanti]").prop('readonly', true);
									}
									
									
									$("input[name=arac_model]").val(""+ data.id +"");
									$("#triger_durum").val(data.triger_durum);
									$("#vites_tipi").val(data.vites_tipi);
									$("#musteri_kodu").val(data.musteri_kodu);
									$("#tur"+data.tur).prop("checked", true);
									$("input[name=tur]").trigger("change");
									
									$("#unvan").val(data.unvan);
									$("#yetkili").val(data.yetkili);
									$("#vergid").val(data.vergid);
									$("#vergin").val(data.vergin);
									$("#eskims_id").val(data.ms_id);
									$("#musteri_adi").val(data.musteri_adi);
									$("#musteri_adi_deger").val(data.ms_id);
									$("#musteri_adi_kdurum").val('-99');
									$("#ruhsat_sahibi").val(data.ruhsat_sahibi);
									$("#tckimlik").val(data.tckimlik);
									$("#gsm").val(data.gsm);
									$("#app_telefon1").val(data.app_telefon1);
									$("#app_telefon2").val(data.app_telefon2);
									$("#app_telefon3").val(data.app_telefon3);
									$("#kw_bilgi").val(data.kw_bilgi);
									$("#telefon").val(data.telefon);
									$("#eposta").val(data.eposta);
									$("#adres").val(data.adres);
									$("#ilce").val(data.ilce);
									$("#sehir").val(data.sehir);
									$("#son_ien_tarih").val(data.son_ien_tarih);
									$("#son_km").val(data.km);
									$("#pa_id").val(data.pa_id);
									$("#kayit_tarihi").val(data.kayit_tarihi);
									$("#bakiye").val(data.bakiye);
									}
								},
								error: function (jqXHR, exception) {
									getErrorMessage(jqXHR, exception);
								}
							});
							try { tamirauto.abort(); } catch(e){}
						}, 100);	
					}
				}
				
				if (idbilgi=='musteri_adi'){
					var musteri_adi_deger=$("#musteri_adi_deger").val();
					$("#musteri_id").val(musteri_adi_deger);
					MusteriBilgiGetir(musteri_adi_deger);
				}
				
				/*if (idbilgi.substring(0,5)=='temin'){
					var islemidsi=idbilgi.substring(5,96);
					var temin=String($("#temin"+islemidsi).val());
					$("#stok_yer"+islemidsi).val(2);
					$("#malzeme_durum"+islemidsi).val(2);
				}*/
			}

function MusteriBilgiGetir(deger){
			$(" label[for=gsm], label[for=telefon], label[for=eposta], label[for=ilce],   label[for=tckimlik], label[for=unvan], label[for=vergid], label[for=vergin]").removeClass('stay');
									
			$("input[name=yetkili], input[name=gsm], input[name=telefon], input[name=eposta], input[name=ilce], input[name=sehir],  input[name=tckimlik], input[name=unvan], input[name=vergid], input[name=vergin], textarea[name=adres]").prop('readonly', false);
			
			$(".musdetay").css('display','none');
			$(".musefatura").css('display','none');
			
			
			$("#musteri_kodu").val('');
			$("#tur1").prop("checked", true);
			$("input[name=tur]").trigger("change");
			$("#unvan").val('');
			//$("#yetkili").val('');
			$("#telefon").val('');
			$("#eposta").val('');
			$("#gsm").val('');
			$("#adres").val('');
			$("#sehir").val('İstanbul');
			$("#ilce").val('');
			$("#tckimlik").val('');
			$("#vergid").val('');
			$("#vergin").val('');
			$("#son_ien_tarih").val('');
			$("#bakiye").val('');
			$("#kayit_tarihi").val('');
									
			setTimeout(function(){
					var musteridegistir;
					musteridegistir=$.ajax({
							type: "GET",
							async : false,
							//cache: false,
							url: "JSON/JSON-firma-bilgi.asp",
							data:'fr='+deger,
								success: function(response){
									
									if(response!=''){
									data = $.parseJSON(response);
									
									//Firma Engel Kontrol
									if(data.engel_durum==2){
										Swal.fire({
											icon: 'error',
											title: 'Dikkat !!!',
											html: 'Firma ile ilgili problemle karşılaşıldı !!!'
										})
										$("#arac").val('');
										$("#arac_deger").val('');
										$("#arac_kdurum").val('');
										$("#arac_icon").html('<i class="icofont-search-2"></i>');
										return false
									}
									
									$("label[for=yetkili], label[for=gsm], label[for=telefon], label[for=eposta], label[for=ilce], label[for=sehir],  label[for=tckimlik], label[for=unvan], label[for=vergid], label[for=vergin]").addClass('stay');
									
									$("input[name=yetkili], input[name=gsm], input[name=telefon], input[name=eposta], input[name=ilce], input[name=sehir],  input[name=tckimlik], input[name=unvan], input[name=vergid], input[name=vergin], textarea[name=adres]").prop('readonly', true);
												
									$(".musdetay").css('display','');
									$(".musdetay").attr('onclick','IframeLightBox(\'firmalar-detay.asp?id='+data.ms_id_enc+'\')');
									$(".musefatura").css('display','');
									
									
									$("#musteri_kodu").val(data.musteri_kodu);
									$("#tur"+data.tur).prop("checked", true);
									$("input[name=tur]").trigger("change");
									$("#unvan").val(data.unvan);
									$("#yetkili").val(data.yetkili);
									$("#telefon").val(data.telefon);
									$("#eposta").val(data.eposta);
									$("#gsm").val(data.gsm);
									$("#adres").val(data.adres);
									$("#sehir").val(data.sehir);
									$("#ilce").val(data.ilce);
									$("#tckimlik").val(data.tckimlik);
									$("#vergid").val(data.vergid);
									$("#vergin").val(data.vergin);
									$("#son_ien_tarih").val(data.son_ien_tarih);
									$("#bakiye").val(data.bakiye);
									$("#kayit_tarihi").val(data.kayit_tarihi);
									}
								},
								error: function (jqXHR, exception) {
									getErrorMessage(jqXHR, exception);
								}
							});
							try { musteridegistir.abort(); } catch(e){}
						}, 100);
			}

$("body").on("click", ".autoara, .yeniauto, .mevcutauto", function(){		
	var idbilgi = String($(this).closest("em").attr("id")).replace("_icon", "");
	var secilistok=$("#"+ idbilgi +"").attr('data-ara-pencere');
	var seciliquery=$("#"+ idbilgi +"").attr('data-ara-query');
	IframeLightBox(secilistok+seciliquery);
});

$("body").on("focusout", "#km", function(e){
	var km=$("#km").val().replaceAll('.','')||0;
	var son_km=$("#son_km").val().replaceAll('.','')||0;
	if(parseFloat(km)<parseFloat(son_km) && parseFloat(km)!=0){
			Swal.fire({
				icon: 'error',
				title: 'Hata !!!',
				text: 'Bu araç son işemrinde '+ son_km +' km olarak işlem görmüştür.\nGirilen km bilgisini kontrol edin!!!'
			})
			$("#km").val($("#son_km").val());
			return false
	}
})	

$("body").on("click", "#km", function(e){
	$("#km").val($("#km").val().replaceAll('.',''));
})

$("body").on("keyup", ".bKarakter", function(){	
	//this.value=this.value.replace(/[^a-zA-Z0-9_-]/g,'').toUpperCase();
	this.value = this.value.replace(/[^a-zA-Z0-9_.-\s]/g, '').toUpperCase();
});

$("body").on("keyup", "#gsm", function(e){
	var app_telefon1=$("#app_telefon1").val();
	//if(app_telefon1==''){
		$("#app_telefon1").val($(this).val())
	//}
})	

$('#arac').keyup(function(){
    this.value=this.value.replace(/[^a-zA-Z0-9_-]/g,'').toUpperCase();
});

$("body").on("click", ".musdegistir", function(){
				Swal.fire({
				title: 'Müşteri Değiştir',
				html:
				'<input type="text" id="swal_firma" name="musteri_adi" maxlength="80" data-url="json-firma.asp" data-ara-pencere="firma-ara.asp?tr=0" data-ara-query="&amp;d=0&sw=1" required="" class="autocomplete form-control" placeholder="Yeni Müşteri Seçiniz" />'+
				
				'<input type="hidden" id="swal_firma_deger" name="firma_deger" value="" />'+
				'<input type="hidden" id="swal_firma_kdurum" name="firma_kdurum" class="autocompletedeger" value="" />'+
				'<em class="autoicon" id="swal_firma_icon"><i class="icofont-search-2 autoara"></i></em>',
				showCancelButton: true,
				confirmButtonText:'Kaydet',
				cancelButtonText:'İptal'
				}).then((result) => {
					if (result.isConfirmed) {
						var yeni_musteri_adi=document.getElementById('swal_firma').value;
						var yeni_musteri_adi_deger=document.getElementById('swal_firma_deger').value;
						var yeni_musteri_adi_kdurum=document.getElementById('swal_firma_kdurum').value;
						if(yeni_musteri_adi_kdurum!=''){
							$("#musteri_adi").val(yeni_musteri_adi);
							$("#musteri_adi_deger").val(yeni_musteri_adi_deger);
							$("#musteri_adi_kdurum").val(yeni_musteri_adi_kdurum);
							MusteriBilgiGetir(yeni_musteri_adi_deger);
							$("#musteri_degistirme").val(1);							
						}
						if(yeni_musteri_adi_kdurum==1){
							$("#musteri_adi_icon").html('<i class="badge badge-warning">YENİ</i>');
							$("input[name=musteri_adi]").prop('readonly', false);
							$("#musteri_adi").addClass('autocomplete');
						}else{
							$("#musteri_adi_icon").html('<i class="badge badge-secondary">KAYITLI</i>');
							$("input[name=musteri_adi]").prop('readonly', true);
							$("#musteri_adi").removeClass('autocomplete');
						}
					}
				})
            });
			
$('body').on('change','input[name=firma_tur]',function(e){
	if($('input[name=firma_tur]:checked').val()!=2){
		$('#bireysel').css('display','block');
		$('#yetkili').val($("input[name=musteri_adi]").val());
		$('#kurumsal').css('display','none');
	}	
	else{
		$('#kurumsal').css('display','block');
		$('#yetkili').val('');
		$('#bireysel').css('display','none');
	}
	Firma_OzellikDegis('.forms-sample');
})	

$('body').on('change','input[name=firma_iletisim_kanal]',function(e){
	const result = $("input[name=firma_iletisim_kanal]")
    .map(function() { return this.checked ? 1 : 0; })
    .get()
    .join('|');
	$("input[name=iletisim_kanal]").val(result);
	Firma_OzellikDegis('.forms-sample');
})	

function Firma_OzellikDegis(formbilgi){
	
	var musteri_id=$("#musteri_id").val();
	var firma_tur=$(formbilgi +" input[name='firma_tur']:checked").val();
	var iletisim_kanal=$(formbilgi +" input[name='iletisim_kanal']").val();
	
	if(musteri_id!=''){
		setTimeout(function(){
		var firmaozellikdegis;
		firmaozellikdegis=$.ajax({
				type: "POST",
				async : false,
				//cache: false,
				url: "ISLEM/firmalar-islem.asp?islem=firmaozellikdegis",
				data:'musteri_id='+ musteri_id +'&firma_tur='+firma_tur+'&iletisim_kanal='+iletisim_kanal,
					success: function(response){
						console.log('firma düzenlendi');
					},
					error: function (jqXHR, exception) {
						getErrorMessage(jqXHR, exception);
					}
				});
				try{firmaozellikdegis.abort();} catch(e){}
			}, 100);
	}
}

$('body').on('keyup','#musteri_bilgileri input[name=musteri_adi]',function(e){	
	if($('input[name=firma_tur]:checked').val()!=2){
	$("input[name=yetkili]").val($(this).val());
	}
})	

$("body").on("click", ".kaydet", function(){
 if($("input[name=plaka]").val()=='' || $("input[name=km]").val()=='' || $("select[name=gelis_nedeni]").val()==''){
	 Swal.fire({
				icon: 'error',
				title: 'Hata !!!',
				text: 'Lütfen bilgileri eksiksiz giriniz'
			})
			return false
 }
}) 

$("body").on("click", ".musefatura", function(){
	setTimeout(function(){
	var firmaid=$("#musteri_id").val();
	var vergin=$("#vergin").val();
	var tckimlik=$("#tckimlik").val();
	var musefaturakontrol;
	musefaturakontrol=$.ajax({
			type: "POST",
			async : false,
			//cache: false,
			url: "JSON/JSON-efatura-kontrol.asp",
			data:'vn='+vergin+'&tck='+tckimlik+'&firmaid='+firmaid,
				success: function(response){
					if(response!=''){
					data = $.parseJSON(response);
						if(data.efatura==0){
							Swal.fire({
								html: '<span class="btn btn-lg btn-info">Firma Bilgilerini Kontrol Ediniz</span>',
								confirmButtonText:'Tamam'
							})
						}	
						if(data.efatura==1){
							$(".musefatura").removeClass('btn-info');
							$(".musefatura").removeClass('btn-success');
							$(".musefatura").addClass('btn-warning');
							$(".musefatura").attr('title','E-arşiv Belirlendi');
							Swal.fire({
								html: '<span class="btn btn-lg btn-warning">Firma E-arşiv Olarak Belirlendi</span>',
								confirmButtonText:'Tamam'
							})
						}
						if(data.efatura==2){
							$(".musefatura").removeClass('btn-info');
							$(".musefatura").removeClass('btn-warning');
							$(".musefatura").addClass('btn-success');
							$(".musefatura").attr('title','E-fatura Belirlendi');
							Swal.fire({
								title: '<span class="btn btn-lg btn-success">Firma E-fatura Olarak Belirlendi</span>',
								confirmButtonText:'Tamam'
							})
						}
						$("#eposta").val(data.eposta);					
					}
				},
				error: function (jqXHR, exception) {
					getErrorMessage(jqXHR, exception);
				}
			});
			try { musefaturakontrol.abort(); } catch(e){}
		}, 100);
	
});

$(".select2").select2();

$(".ustasec").select2({
		placeholder: "Lütfen İlgili Ustaları Seçiniz",
		multiple: true,
		allowClear: true,
		ajax: { 
			url: "json/JSON-usta.asp",
			dataType: 'json',
			data: function (term, page){
				return{
					term:term,
					page_limit:5
				};
			},
			results:function (data, page){
				return {results: data};				
			}
		},
		formatSelection: function(data){ 
			return data.text; 
		},
		createSearchChoice: function(term){
			return false;
		}
})
 
$(".faturasablon").select2({
        placeholder: "Lütfen Kontrol Listesi Seçiniz",
		multiple: true,
		allowClear: true,
        ajax: { 
            url: "json/JSON-fatura-sablon.asp",
            dataType: 'json',
            data: function (term, page) {
                return {
                    term: term, // search term
                    page_limit: 5,
                };
            },
            results: function (data, page) { 
                return {results: data};
            }
        },
         formatSelection: function(data) { 
			//$("input[name=ms_id]").val(data.ms_id);
			return data.text; 
        }
 });
	
$(".select2").on("change", function(){
		var iddeger=$(this).val();
		var selectname=$(this).attr("bilgi");
		if(selectname!=undefined){
				if(selectname!='son'){
					if(selectname=='seri'){
						$("#seri").empty().html('<option value="-99">Seri Seçiniz</option>');
						$("#yil").empty().html('<option value="-99">Model Yılı Seçiniz</option>');
						$("#yakit").empty().html('<option value="-99">Yakıt Tipi Seçiniz</option>');
						$("#model").empty().html('<option value="-99">Model Seçiniz</option>');
						$("#select2-marka-container").parents("span.select2-selection").addClass("select2-container-aktif");
						$("#select2-seri-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						$("#select2-yil-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						$("#select2-yakit-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						$("#select2-model-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						
						$("input[name=arac_model]").val('');
						$("#yil").attr("disabled", true);
						$("#yakit").attr("disabled", true);						
						$("#model").attr("disabled", true);
					}
					if(selectname=='yil'){
						$("#yil").empty().html('<option value="-99">Model Yılı Seçiniz</option>');
						$("#yakit").empty().html('<option value="-99">Yakıt Tipi Seçiniz</option>');
						$("#model").empty().html('<option value="-99">Model Seçiniz</option>');
						
						$("#select2-seri-container").parents("span.select2-selection").addClass("select2-container-aktif");
						$("#select2-yil-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						$("#select2-yakit-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						$("#select2-model-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						
						$("#yakit").attr("disabled", true);						
						$("#model").attr("disabled", true);
					}
					if(selectname=='yakit'){
						$("#yakit").empty().html('<option value="-99">Yakıt Tipi Seçiniz</option>');
						$("#model").empty().html('<option value="-99">Model Seçiniz</option>');
						
						$("#select2-yil-container").parents("span.select2-selection").addClass("select2-container-aktif");
						$("#select2-yakit-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						$("#select2-model-container").parents("span.select2-selection").removeClass("select2-container-aktif");
						
						$("#model").attr("disabled", true);
					}
					if(selectname=='model'){
						$("#model").empty().html('<option value="-99">Model Seçiniz</option>');
						
						$("#select2-yakit-container").parents("span.select2-selection").addClass("select2-container-aktif");
						$("#select2-model-container").parents("span.select2-selection").removeClass("select2-container-aktif");
					}
					
						
					
					
					$("#"+selectname).attr("disabled", false);
							$("#"+selectname).select2({
								
									ajax: { 
										url: "json/json-"+selectname+".asp",
										dataType: 'json',
										data: function (term, page) {
											return{
												term:term,
												page_limit:5,
												id: iddeger
											};
										},
										results:function (data, page) { 
											return {results: data};				
										}
									},
									formatSelection: function(data) { 
										return data.text; 
									},
									createSearchChoice: function(term){
										return false;
									}
							})	
							
					
				}
				if(selectname=='son'){
					$("#select2-model-container").parents("span.select2-selection").addClass("select2-container-aktif");
					//Yakıt Seçimi
								$("input[name=arac_model]").val(iddeger);
																
							}
			}				
	}); 