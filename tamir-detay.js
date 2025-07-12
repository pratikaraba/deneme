//##### GENEL #####
$("body").on("click", "#btn_isemriduzenle",function(){
				var url=$(this).attr('url');
				var tabmenu=$("#tabmenu").val();
				location.href=url+'&d='+tabmenu
			});

$('body').on('click','.rtabs li',function(){
	$("#tabmenu").val($(this).attr('id-bilgi'));
})			

$("body").on("click", ".ieneksikbilgi", function(){
				swal.fire("Firma / Araç / İşemri bilgilerinde eksik bulunmaktadır. Öncelikle eksik bilgileri tamamlamalısınız !!!");
				return false
			});
			
$("body").on("click", ".ihtiyaceksikbilgi", function(){
			Swal.fire({
			html:  'İhtiyaç listesinde tamamlanmamış kayıt bulunmaktadır.',
			showCancelButton: false,
			confirmButtonText:'Kapat',
			}).then((result) => {
				if (result.isConfirmed) {
					$(".tab2baslik").trigger('click');
				}
			})
			return false
});
			
	

$("body").on("click", ".swalyazdir", function(){
	var gelis_nedeni=$("#gelis_nedeni option:checked").attr("kod");
	var durum=$(this).attr("durum");
	
	if(durum==5){
		var swalmesaj='<a href="javascript:" onclick="IframeLightBox(\'isemri-acilis-yazdir.asp?id='+ $(this).attr("idbilgi") +'\')" class="btn btn-lg btn-success" title="İşemri Açılış Yazdır">Açılış IEN Yazdır</a><br /><br /><a href="javascript:" onclick="IframeLightBox(\'isemri-kapanis-yazdir.asp?id='+ $(this).attr("idbilgi") +'\')" class="btn btn-lg btn-danger" title="İşemri Kapanış Yazdır">Kapanış IEN Yazdır</a>'
	}else{
		var swalmesaj='<a href="javascript:" onclick="IframeLightBox(\'isemri-acilis-yazdir.asp?id='+ $(this).attr("idbilgi") +'\')" class="btn btn-lg btn-success" title="İşemri Açılış Yazdır">Açılış IEN Yazdır</a><br /><br /><a href="javascript:" onclick="IframeLightBox(\'isemri-onizleme-yazdir.asp?id='+ $(this).attr("idbilgi") +'\')" class="btn btn-lg btn-warning" title="İşemri Önizleme Yazdır">Önizleme IEN Yazdır</a>'	
	}
	
	if(gelis_nedeni=='HSR'){
		swalmesaj=swalmesaj+'<br /><br /><a href="javascript:" onclick="IframeLightBox(\'hasar-onizleme-yazdir.asp?id='+ $(this).attr("idbilgi") +'\')" class="btn btn-lg btn-primary" title="Hasar IEN Yazdır">Hasar IEN Yazdır</a>'
	}
	
	Swal.fire({
			title: 'Yazdırma Seçenekleri',
			html:swalmesaj,
			showCancelButton: false,
			confirmButtonText:'Kapat'
	})
	return false
});	



$("body").on("click", ".kdv18durum", function(){
	var urladres=$(this).attr('urladres');
	
	Swal.fire({
			html:  'KDV Oranı %18 olan ürünler var !!!',
			showCancelButton: true,
			confirmButtonText:'Tamam',
			cancelButtonText:'İptal',
			}).then((result) => {
				if (result.isConfirmed) {
					IframeLightBox(urladres);
				}
			})
			return false
})


$("body").on("change", "select[name=gelis_nedeni]", function(){
	if($("select[name=gelis_nedeni] option:selected").val()==10){
		$(".rtabs li[id-bilgi=6]").css('display','');
	}else{
		$(".rtabs li[id-bilgi=6]").css('display','none');
		$(".rtabs li[id-bilgi=1] a").trigger('click');
	}
})	


//##### Araç / Müşteri Bilgileri #####
$('body').on('click, mousedown, mouseup','#arac_bilgileri input,#arac_bilgileri select, .select2',function(){
	$("#arac_degistirme").val(1);
});

$('body').on('click, mousedown, mouseup','#musteri_bilgileri input,#musteri_bilgileri select,#musteri_bilgileri textarea',function(){
	$("#musteri_degistirme").val(1);
});

			
//##### Müşteri Talepleri / İhtiyaç Listesi #####
function GenelToplamFiyat(){
// En üstteki toplam alanı	
				var tamirid=$("#tamirid").val();
				setTimeout(function(){
					var geneltoplamfiyat;
					geneltoplamfiyat=$.ajax({
							type: "POST",
							async : false,
							//cache: false,
							url: "JSON/JSON-tamir-toplam-fiyat.asp",
							data:'tamirid='+tamirid,
								success: function(response){
									if(response!=''){
										data = $.parseJSON(response);
										
										$(".isemri_isciliktoplam").html(data.iscilik_toplam);
										$(".isemri_malzemetoplam").html(data.malzeme_toplam);
										$(".isemri_iscilikkdv").html(data.iscilik_kdv);
										$(".isemri_malzemekdv").html(data.malzeme_kdv);
										$(".isemri_iscilikmaliyet").html(data.iscilik_maliyet);
										$(".isemri_malzememaliyet").html(data.malzeme_maliyet);
										
										$(".isemri_tahakkuk").html(data.toplam_tahakkuk);
										$(".isemri_kdvsiztahakkuk").html(data.isemri_kdvsiztahakkuk);
									}
								},
								error: function (jqXHR, exception) {
									getErrorMessage(jqXHR, exception);
								}
							});
							try {geneltoplamfiyat.abort();} catch(e){}
						}, 100);	
				
				
            }

function ToplamUrunAdet(){
					var miktar=0;
				$(".topurunbadge").each(function(i){
					miktar+=parseFloat($(this).html());
				})	
				$("#toplamihtiyac").html(miktar);
			}
					
function SatirHesaplama(sutunid, name){
	var secilitur=$("#talep_sutun" + sutunid + " select[name=tur] option:selected").val();
	var miktar = parseFloat($("#talep_sutun" + sutunid + " input[name=miktar]").val()) || 1;
	var oneri_miktar = parseFloat($("#talep_sutun" + sutunid + " input[name=oneri_miktar]").val()) || 1;
	var kdv = parseFloat($("#talep_sutun" + sutunid + " input[name=kdv]").val()) || 0;
	var kdv_tur = parseFloat($("#talep_sutun" + sutunid + " input[name=kdv_tur]").val()) || 0;
	var birim_maliyet = parseFloat($("#talep_sutun" + sutunid + " input[name=birim_maliyet]").val()) || 0;
	var maliyet_kdv = parseFloat($("#talep_sutun" + sutunid + " input[name=maliyet_kdv]").val()) || 0;
	//var kdvli_maliyet=(birim_maliyet+maliyet_kdv).toFixed(2);
	var birim_fiyat = parseFloat($("#talep_sutun" + sutunid + " input[name=birim_fiyat]").val()) || 0;
	var birim_kdv = parseFloat($("#talep_sutun" + sutunid + " input[name=birim_kdv]").val()) || 0;
	//var kdvli_fiyat=(birim_fiyat+birim_kdv).toFixed(2);
	var toplam_tahakkuk = parseFloat($("#talep_sutun" + sutunid + " input[name=toplam_tahakkuk]").val()) || 0;
	var iskonto_orani = parseFloat($("#talep_sutun" + sutunid + " input[name=iskonto_orani]").val()) || 0;
	var iskonto = parseFloat($("#talep_sutun" + sutunid + " input[name=iskonto]").val()) || 0;
	
	var iskonto_hesap=((100-parseFloat(iskonto_orani))/100)||0;
	
	
	if(name=="miktar"){
		toplam_tahakkuk=((birim_fiyat+birim_kdv)*miktar)*iskonto_hesap
		iskonto=((birim_fiyat+birim_kdv)*miktar)-toplam_tahakkuk;
	}
	if(name=="birim_maliyet"){
		maliyet_kdv=(birim_maliyet*kdv)-birim_maliyet;
	}
	if(name=="birim_fiyat"){
		if($("#talep_sutun" + sutunid + " input[name=birim_fiyat]").hasClass("sifirlama")){
			if(secilitur<7 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet))){
					Swal.fire({
						icon: 'error',
						title: 'Hata 5-2 !!!',
						text: 'Satış fiyatı maliyetten küçük olmamalıdır !!!',
					})
					//return false
					var birimkdvli_fiyat=parseFloat($("#talep_sutun" + sutunid + " .birimkdvli_fiyat").html());
					birim_fiyat=birimkdvli_fiyat-birim_kdv;
				}
		}		
		birim_kdv=(birim_fiyat*kdv)-birim_fiyat;
		toplam_tahakkuk=((birim_fiyat+birim_kdv)*miktar)*iskonto_hesap;
		iskonto=((birim_fiyat+birim_kdv)*miktar)-(((birim_fiyat+birim_kdv)*iskonto_hesap)*miktar);	
	}
	if(name=="toplam_tahakkuk"){
		if(secilitur<7 && (parseFloat(toplam_tahakkuk)<parseFloat(birim_maliyet))){
					Swal.fire({
						icon: 'error',
						title: 'Hata 5-3 !!!',
						text: 'Satış fiyatı maliyetten küçük olmamalıdır !!!',
					})
					//return false
					toplam_tahakkuk=birim_maliyet
				}	
		iskonto=((birim_fiyat+birim_kdv)*miktar)-toplam_tahakkuk;
		birim_iskonto=(((birim_fiyat+birim_kdv)*miktar)/100)||1;
		tahakkuk_iskonto=(toplam_tahakkuk/birim_iskonto)||0
		iskonto_orani=100-tahakkuk_iskonto;
		
		//satis_fiyat=(toplam_tahakkuk/miktar)/iskonto_hesap;
		//birim_fiyat=satis_fiyat/kdv;
		//birim_kdv=satis_fiyat-birim_fiyat;
		
	}
		
	
	$("#talep_sutun" + sutunid + " input[name=birim_maliyet]").val(birim_maliyet.toFixed(4));
	$("#talep_sutun" + sutunid + " .birimkdvli_maliyet").html((birim_maliyet+maliyet_kdv).toFixed(4));
	$("#talep_sutun" + sutunid + " .topkdvlimaliyet").html(((birim_maliyet+maliyet_kdv)*miktar).toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=maliyet_kdv]").val(maliyet_kdv.toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=birim_fiyat]").val(birim_fiyat.toFixed(4));
	$("#talep_sutun" + sutunid + " .birimkdvli_fiyat").html((birim_fiyat+birim_kdv).toFixed(4));
	$("#talep_sutun" + sutunid + " .topkdvlifiyat").html(((birim_fiyat+birim_kdv)*miktar).toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=birim_kdv]").val(birim_kdv.toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=toplam_tahakkuk]").val((toplam_tahakkuk).toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=toplam_kdvsiztahakkuk]").val((toplam_tahakkuk/kdv).toFixed(4));
	$("#talep_sutun" + sutunid + " .topkdvsiztahakkuk").html((toplam_tahakkuk/kdv).toFixed(4));
	$("#talep_sutun" + sutunid + " .toptahakkuk").html((toplam_tahakkuk).toFixed(4));
	$("#talep_sutun" + sutunid + " .topiskonto_tutar").html((iskonto).toFixed(4));
	$("#talep_sutun" + sutunid + " .topiskonto_orani").html((iskonto_orani).toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=iskonto_orani]").val((iskonto_orani).toFixed(4));
	$("#talep_sutun" + sutunid + " input[name=iskonto]").val((iskonto).toFixed(4));
}   

$("body").on("click", ".talepiptal", function(){
		Swal.fire({
		title: 'Talep İptal Nedeni',
		html:'<textarea id="talep_iptal_nedeni" maxlength="200" class="form-control" rows="5"></textarea>' +
		'<input type="hidden" name="talep_iptal_ustmenu" id="talep_iptal_ustmenu" value="'+ $(this).attr("ustmenu") +'" />'+
		'<input type="hidden" name="talep_iptal_id" id="talep_iptal_id" value="'+ $(this).attr("talepid") +'" />'+
		'<input type="hidden" name="talep_iptal_tmr" id="talep_iptal_tmr" value="'+ $(this).attr("tamirid") +'" />',
		showCancelButton: true,
		confirmButtonText:'Kaydet',
		cancelButtonText:'İptal'
		}).then((result) => {	
                    if (result.isConfirmed) {
						var talep_iptal_nedeni=document.getElementById('talep_iptal_nedeni').value;
						var talep_iptal_ustmenu=document.getElementById('talep_iptal_ustmenu').value;
						var talep_iptal_id=document.getElementById('talep_iptal_id').value;
						var talep_iptal_tmr=document.getElementById('talep_iptal_tmr').value;
						
						var talepiptal=$.ajax({
        					url: 'ISLEM/tamirler-islem.asp?islem=talepiptal',
        					type: 'post',
        					async: false,
        					data: {talep_iptal_nedeni:talep_iptal_nedeni, ustmenu:talep_iptal_ustmenu, talepid:talep_iptal_id, tamirid: talep_iptal_tmr},
        					success: function(response){
        						if(response=='iptal edildi'){
									location.reload();
								}
        					},
        					error: function (jqXHR, exception) {
        						getErrorMessage(jqXHR, exception);
        					}
        				});
						talepiptal.abort();
                    }
                });
            });

$("body").on("click", ".talepekle",function(){
	if($("input[name=yenitlp_id]").val()==''){
					Swal.fire({
						icon: 'error',
						title: 'Hata 4 !!!',
						text: 'Lütfen bilgileri eksiksiz doldurunuz',
					})
					return false
				}
	else{
				//document.ustunoto.action='?islem=ekle';
				//document.ustunoto.submit();
				$("#km").prop('required',false);
				$("#gelis_nedeni").prop('required',false);
				return true
			}
})

$("body").on("click", ".talepnot", function(){
	 
				Swal.fire({
		title: 'Malzeme Notları',
		html:'<textarea id="malzeme_not" class="form-control" rows="5">'+ $(this).attr("title") +'</textarea>' +
		'<input type="hidden" name="not_malzeme_id" id="not_malzeme_id" value="'+ $(this).attr("idbilgi") +'" />',
		showCancelButton: true,
		confirmButtonText:'Kaydet',
		cancelButtonText:'İptal'
		}).then((result) => {	
                    if (result.isConfirmed) {
						var malzeme_not=document.getElementById('malzeme_not').value;
						var not_malzeme_id=document.getElementById('not_malzeme_id').value;
						
						var notyukle=$.ajax({
        					url: 'ISLEM/tamirler-islem.asp?islem=notduzenle',
        					type: 'post',
        					async: false,
        					data: {malzeme_not:malzeme_not,not_malzeme_id:not_malzeme_id},
        					success: function(response){
        						if(response=='not eklendi'){
									if(malzeme_not!=''){
									$("#malnot"+not_malzeme_id).removeClass('btn-secondary');
									$("#malnot"+not_malzeme_id).addClass('btn-success');
									}else{
									$("#malnot"+not_malzeme_id).removeClass('btn-success');
									$("#malnot"+not_malzeme_id).addClass('btn-secondary');	
									}
									$("#malnot"+not_malzeme_id).attr('title',malzeme_not);
								}
        					},
        					error: function (jqXHR, exception) {
        						console.log('hata var');
        					}
        				});
						notyukle.abort();
                    }
                });
            });

			

$("body").on("blur", "input.hsp",function(){
	var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
	var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
	SatirHesaplama(sutunid, $(this).attr('name'));
	/*TalepToplamFiyat(satirid);*/
	GenelToplamFiyat();
})

$("body").on("focusout", ".ienmalzemeliste input[name=miktar]",function(){
	var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
	var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
	
	var tur = $("#talep_sutun" + sutunid + " select[name=tur] option:selected").val();
			
    var stk_id = $("#talep_sutun" + sutunid + " input[name=stk_id]").val();
	var miktar = parseFloat($("#talep_sutun" + sutunid + " input[name=miktar]").val()) || 1;
	var oneri_miktar = $("#talep_sutun" + sutunid + " input[name=oneri_miktar]").val()||0;
	if($("#talep_sutun" + sutunid + " .tmiktar").html()!=''){
		var tmiktar = parseFloat($("#talep_sutun" + sutunid + " .tmiktar").html().replace(',','.')) || 0;
		var maks_miktar=parseFloat(tmiktar);
	}
	else{
		var maks_miktar=0;
	}
	
	var secilidurum=$("#talep_sutun" + sutunid + " select[name=malzeme_durum] option:selected").val();
	
	if(tur==1 && stk_id!='' && parseFloat(miktar)>parseFloat(maks_miktar)){
			Swal.fire({
				icon: 'error',
				title: 'Hata 1 !!!',
				html: 'Mevcut '+ maks_miktar +' adet stok bulunmaktadır.<br>Lütfen sipariş oluşturunuz.',
			})
			$("#talep_sutun" + sutunid + " input[name=miktar]").val(maks_miktar);
	}	
				
	SatirHesaplama(sutunid, 'miktar');			
	/*TalepToplamFiyat(satirid);*/
	GenelToplamFiyat();
})

$("body").on("change", "select[name=tur]", function(){
				var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
				var secilitur=$("#talep_sutun" + sutunid + " select[name=tur] option:selected").val();
				var seciliquery=secilitur
				if(secilitur==1){
					//seciliquery=secilitur+'&st=2'
					seciliquery=secilitur
				}
				$("#talep_sutun" + sutunid + " input[name=stk_id]").attr('data-ara-query','&d='+seciliquery);
				$("#talep_sutun" + sutunid + " input[name=stk_id]").attr('data-url','json-stok-karti.asp?d='+secilitur);
				$("#talep_sutun"+ sutunid +" input[name=birim_maliyet]").prop('disabled',false);
				$("#talep_sutun"+ sutunid +" select[name=malzeme_durum]").val(3);
				
				if(secilitur==1){
				$("#talep_sutun"+ sutunid +" input[name=birim_maliyet]").prop('disabled',true);	
				}
				if(secilitur==2){
				//$("#talep_sutun"+ sutunid +" input[name=birim_maliyet]").prop('disabled',true);
				$("#talep_sutun"+ sutunid +" select[name=malzeme_durum]").val(4);
				}
				if(secilitur==4){
				$("#talep_sutun"+ sutunid +" select[name=malzeme_durum]").val(4);
				}
				
				var islemidsi=sutunid;
				$("#talep_sutun"+ islemidsi +" input[name=stk_id]").val('');
				$("#talep_sutun"+ islemidsi +" input[name=stk_id_deger]").val('');
				$("#talep_sutun"+ islemidsi +" #barkodbilgi"+ islemidsi +"").css('display','none');
				$("#talep_sutun"+ islemidsi +" input[name=stk_id_kdurum]").val('');
				$("#talep_sutun"+ islemidsi +" #stk_id"+ islemidsi +"_icon").html('<i class="icofont-search-2 autoara" ></i>');
				$("#talep_sutun"+ islemidsi +" input[name=kdv]").val('1.20');
				$("#talep_sutun"+ islemidsi +" input[name=kdv_tur]").val('');
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
				$("#talep_sutun"+ islemidsi +" input[name=birim_tahakkuk]").val('');
				$("#talep_sutun"+ islemidsi +" .topkdvsiztahakkuk").html('0');
				$("#talep_sutun"+ islemidsi +" .toptahakkuk").html('0');
				$("#talep_sutun"+ islemidsi +" .topiskonto_orani").html('0');
				$("#talep_sutun"+ islemidsi +" input[name=toplam_tahakkuk]").val('0');
				$("#talep_sutun"+ islemidsi +" input[name=toplam_kdvsiztahakkuk]").val('0');
				$("#talep_sutun"+ islemidsi +" input[name=iskonto_orani]").val('0');
				$("#talep_sutun"+ islemidsi +" input[name=iskonto]").val('0');
				$("#talep_sutun"+ islemidsi +" .tmiktar").addClass('hidden');
				$("#talep_sutun"+ islemidsi +" .tmiktar").html('9999');
				
				$("#talep_sutun"+ islemidsi +" input[name=temin]").val('');
				$("#talep_sutun"+ islemidsi +" input[name=temin_deger]").val('');
				$("#talep_sutun"+ islemidsi +" input[name=temin_kdurum]").val('');
				$("#talep_sutun"+ islemidsi +" #firma"+ islemidsi +"_icon").html('<i class="icofont-search-2 autoara" ></i>');
			})

$("body").on("click", ".autoara, .yeniauto, .mevcutauto", function(){	
	var sutunid = String($(this).closest("em").attr("id")).replace("_icon", "");
	var secilistok=$("#" + sutunid).attr('data-ara-pencere');
	var seciliquery=$("#" + sutunid).attr('data-ara-query');

	IframeLightBox(secilistok+seciliquery);
});		
			

$('body').on('click','.topiskonto_tutar',function(){
				var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
				var sutunid=$(this).attr('sutun'); 
				
				var iskonto_orani=$("#talep_sutun"+sutunid+" input[name=iskonto_orani]").val()||0;
			
				Swal.fire({
				title: 'İskonto Oranı',
				html:  '<input name="iskonto_orani_yeni" id="iskonto_orani_yeni" class="form-control parabirimi" placeholder="İskonto Oranı" value="'+ ((iskonto_orani==0)? "": iskonto_orani) +'" autocomplete="off" />',
				showCancelButton: true,
				confirmButtonText:'Kaydet',
				cancelButtonText:'İptal'
				}).then((result) => {
					if (result.isConfirmed) {
						var iskonto_hesap=(100-parseFloat(document.getElementById('iskonto_orani_yeni').value))/100

						
						var iskonto_orani_yeni=parseFloat(document.getElementById('iskonto_orani_yeni').value).toFixed(4);
						$("#talep_sutun"+sutunid+" input[name=iskonto_orani]").val(iskonto_orani_yeni);
						$("#talep_sutun"+sutunid+" .topiskonto_orani").html(iskonto_orani_yeni);
						
						SatirHesaplama(sutunid, 'birim_fiyat');
						/*TalepToplamFiyat(satirid);*/
						GenelToplamFiyat();
						$("#talep_sutun"+sutunid+" .malzemeduzenle").trigger('click');
					}
				})
			});

$("body").on("click", ".yenimalzemeekle", function(){
                var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
                var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
				
				
				var tamirid=$("#tamirid").val();
                var stk_id = $("#talep_sutun" + sutunid + " input[name=stk_id]").val();
				var stk_id_deger = $("#talep_sutun" + sutunid + " input[name=stk_id_deger]").val();
				var stk_id_kdurum = $("#talep_sutun" + sutunid + " input[name=stk_id_kdurum]").val();
				var tlp_id = $("#talep_sutun" + sutunid + " input[name=tlp_id]").val();
				var per_id = $("#talep_sutun" + sutunid + " input[name=per_id]").val();
				var tur = $("#talep_sutun" + sutunid + " select[name=tur] option:selected").val();
				var miktar = $("#talep_sutun" + sutunid + " input[name=miktar]").val()||1;
				var min_kar = $("#talep_sutun" + sutunid + " input[name=min_kar]").val()||1;
				var kdv_tur = $("#talep_sutun" + sutunid + " input[name=kdv_tur]").val()||1;
				var birim_maliyet = $("#talep_sutun" + sutunid + " input[name=birim_maliyet]").val()||0;
				var maliyet_kdv = $("#talep_sutun" + sutunid + " input[name=maliyet_kdv]").val()||0;
				var birim_fiyat = $("#talep_sutun" + sutunid + " input[name=birim_fiyat]").val()||0;
				var birim_kdv = $("#talep_sutun" + sutunid + " input[name=birim_kdv]").val()||0;
				var iskonto_orani = $("#talep_sutun" + sutunid + " input[name=iskonto_orani]").val()||0;
				var iskonto = $("#talep_sutun" + sutunid + " input[name=iskonto]").val()||0;
				var toplam_tahakkuk = $("#talep_sutun" + sutunid + " input[name=toplam_tahakkuk]").val()||0;
				var malzeme_durum = $("#talep_sutun" + sutunid + " select[name=malzeme_durum] option:selected").val();
				var stok_yer = $("#talep_sutun" + sutunid + " select[name=stok_yer] option:selected").val();
				var temin = $("#talep_sutun" + sutunid + " input[name=temin]").val();
				var temin_deger = $("#talep_sutun" + sutunid + " input[name=temin_deger]").val();
				var temin_kdurum = $("#talep_sutun" + sutunid + " input[name=temin_kdurum]").val();
				
				var ka_id = $("#stk_id"+ sutunid +"_bilgi select[name=ka_id] option:selected").val();
				var malzeme = $("#stk_id"+ sutunid +"_bilgi input[name=malzeme]").val();
				var stok_kodu = $("#stk_id"+ sutunid +"_bilgi input[name=stok_kodu]").val();
				var barkod = $("#stk_id"+ sutunid +"_bilgi input[name=barkod]").val();
				var yeni_kdv_tur = $("#stk_id"+ sutunid +"_bilgi select[name=yeni_kdv_tur] option:selected").val();
				var birim = $("#stk_id"+ sutunid +"_bilgi select[name=birim] option:selected").val();
				
				var gelir_fr_id=$("#talep_sutun" + sutunid + " input[name=gelir_fr_id]").val();
				var eski_iht_id=$("#talep_sutun" + sutunid + " input[name=eski_iht_id]").val();
				var eski_sh_id=$("#talep_sutun" + sutunid + " input[name=eski_sh_id]").val();
				
				if(String(yeni_kdv_tur)!='undefined' && yeni_kdv_tur!=''){
					kdv_tur=yeni_kdv_tur
				}	
								
				if(stk_id=='' || birim_maliyet=='' || birim_fiyat=='' || toplam_tahakkuk==''){
					Swal.fire({
						icon: 'error',
						title: 'Hata 1a !!!',
						text: 'Lütfen bilgileri eksiksiz doldurunuz',
					})
					return false
				}
				
				if(miktar<0.1){
					Swal.fire({
						icon: 'error',
						title: 'Hata 2a !!!',
						text: 'En az 1 adet girmelisiniz !!!',
					})
					return false
				}
				
				birim_maliyet_yuzde5=(parseFloat(birim_maliyet)*1.10).toFixed(2);
				birim_maliyet_yuzde10=(parseFloat(birim_maliyet)*1.15).toFixed(2);
				birim_maliyet_yuzde25=(parseFloat(birim_maliyet)*1.45).toFixed(2);
				birim_maliyet_yuzde35=(parseFloat(birim_maliyet)*1.55).toFixed(2);
				
				
				if($("#talep_sutun" + sutunid + " input[name=birim_fiyat]").hasClass("sifirlama")){
					
				if(tur==1 && min_kar==2 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde5))){
					Swal.fire({
						icon: 'error',
						title: 'Hata 3-1a !!!',
						text: 'Satış Fiyatı en az '+ birim_maliyet_yuzde5 +' TL olmalıdır',
					})
					return false
				}
				
				
				if(tur==1 && min_kar==2 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde10))){
					Swal.fire({
						icon: 'warning',
						title: 'Hata 4-1a !!!',
						text: 'Satış Fiyatını %15 olan '+ birim_maliyet_yuzde10 +' TL den daha az belirledin',
					})
				}
				
				
				if(tur==1 && min_kar==1 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde25))){
					Swal.fire({
						icon: 'error',
						title: 'Hata 3a !!!',
						text: 'Satış Fiyatı en az '+ birim_maliyet_yuzde25 +' TL olmalıdır',
					})
					return false
				}
				
				
				if(tur==1 && min_kar==1 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde35))){
					Swal.fire({
						icon: 'warning',
						title: 'Hata 4a !!!',
						text: 'Satış Fiyatını %55 olan '+ birim_maliyet_yuzde35 +' TL den daha az belirledin',
					})
				}
				}
				
				
				if((tur==1 || tur==2) && stk_id_kdurum==1){
					Swal.fire({
						icon: 'error',
						title: 'Hata 5a !!!',
						text: 'Lütfen önce stok kartını oluşturunuz',
					})
					return false
				}
				
				
				
				var kadet=0;
				$("input[name=stk_id_deger]").each(function(index){
					if($(this).val() == stk_id_deger){
						kadet+=1;
					}
				});
				if((tur==1 || tur==2) && kadet>1){
					Swal.fire({
						icon: 'error',
						title: 'Hata 6a !!!',
						text: 'Bu işemrinde bu stok kartı zaten var lütfen adedi değiştiriniz',
					})
					return false
				}
				
				
                var talepekle;
				talepekle=$.ajax({
                    type: "POST",
                    async: false,
                    cache: false,
					data: {tamirid:tamirid, stk_id:stk_id, stk_id_deger:stk_id_deger, stk_id_kdurum: stk_id_kdurum, tlp_id:tlp_id, per_id:per_id, tur:tur, miktar:miktar, kdv_tur:kdv_tur, birim_maliyet:birim_maliyet, maliyet_kdv:maliyet_kdv, birim_fiyat:birim_fiyat, birim_kdv:birim_kdv, iskonto_orani:iskonto_orani, iskonto:iskonto, toplam_tahakkuk:toplam_tahakkuk, malzeme_durum:malzeme_durum, stok_yer:stok_yer, temin:temin, temin_deger:temin_deger, temin_kdurum:temin_kdurum, ka_id:ka_id, malzeme:malzeme, stok_kodu:stok_kodu, barkod:barkod, yeni_kdv_tur:yeni_kdv_tur, birim:birim, gelir_fr_id:gelir_fr_id, eski_iht_id:eski_iht_id, eski_sh_id:eski_sh_id},
                    url: "ajax/malzeme-ekle.asp",
                    success: function (response) {
						if(response=="kapali"){
							SayfaYenile();
						}else{
							$("#talep_sutun" + sutunid).before(response);
							$("#talep_sutun" + sutunid +" #stk_id"+ sutunid +"_icon").html('<i class="icofont-search-2 autoara"></i>');
							/*$("#talep_sutun" + sutunid +" input[name=stk_id]").attr('data-ara-query','&d=1&st=2');
							$("#talep_sutun" + sutunid +" input[name=stk_id]").attr('data-url','json-stok-karti.asp?d=1&st=2');*/
							$("#talep_sutun" + sutunid +" input[name=stk_id]").attr('data-ara-query','&d='+tur);
							$("#talep_sutun" + sutunid +" input[name=stk_id]").attr('data-url','json-stok-karti.asp?d='+tur);							
							$("#talep_sutun" + sutunid +" input").val('');
							$("#talep_sutun" + sutunid +" input[name=tlp_id]").val(tlp_id);
							$("#talep_sutun" + sutunid +" #tur"+ sutunid).val(tur);
							$("#talep_sutun" + sutunid +" #stok_yer"+ sutunid).val('1');
							$("#talep_sutun" + sutunid +" input[name=miktar]").val('1');
							$("#talep_sutun" + sutunid +" #malzeme_durum"+ sutunid).val('4');
							$("#talep_sutun" + sutunid +" .tfiyat").html('0');
							$("#barkodbilgi" + sutunid +"").css('display','none');
							$("#talep_sutun"+ sutunid +" .tmiktar").addClass('hidden');
							$("#stk_id" + sutunid +"_bilgi").html('');
							
							var toplamurun=$("#toplamurun" + tlp_id).html()||0;
							//$("#toplamurun" + tlp_id).html(parseFloat(toplamurun)+parseFloat(miktar));
							$("#toplamurun" + tlp_id).html(parseFloat(toplamurun)+1);
							$("#talep_satir"+ satirid +" .tlpsil").addClass("d-none");
							$("#talep_satir"+ satirid +" .tlpsil").removeClass("talepiptal");
							ToplamUrunAdet();
						}
                    },
                    error: function (jqXHR, exception) {
                        getErrorMessage(jqXHR, exception);
                    },
                });
				talepekle.abort();
                /*TalepToplamFiyat(satirid);*/
				GenelToplamFiyat();
            });
					
$("body").on("click", ".malzemeduzenle", function(){
				var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
                var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
				var sonrakisutunid = String($("#malzemedetaybilgi"+sutunid).next().attr("id")).replace("talep_sutun", "");
				
				
				var tamirid=$("#tamirid").val();
				var iht_id = String($(this).attr("data-id"));
                var stk_id = $("#talep_sutun" + sutunid + " input[name=stk_id]").val();
				var stk_id_deger = $("#talep_sutun" + sutunid + " input[name=stk_id_deger]").val();
				var stk_id_kdurum = $("#talep_sutun" + sutunid + " input[name=stk_id_kdurum]").val();
				var tlp_id = $("#talep_sutun" + sutunid + " input[name=tlp_id]").val();
				var tur = $("#talep_sutun" + sutunid + " select[name=tur] option:selected").val();
				var miktar = $("#talep_sutun" + sutunid + " input[name=miktar]").val()||1;
				var min_kar = $("#talep_sutun" + sutunid + " input[name=min_kar]").val()||1;
				var kdv_tur = $("#talep_sutun" + sutunid + " input[name=kdv_tur]").val()||1;
				var birim_maliyet = $("#talep_sutun" + sutunid + " input[name=birim_maliyet]").val()||0;
				var maliyet_kdv = $("#talep_sutun" + sutunid + " input[name=maliyet_kdv]").val()||0;
				var birim_fiyat = $("#talep_sutun" + sutunid + " input[name=birim_fiyat]").val()||0;
				var birim_kdv = $("#talep_sutun" + sutunid + " input[name=birim_kdv]").val()||0;
				var iskonto_orani = $("#talep_sutun" + sutunid + " input[name=iskonto_orani]").val()||0;
				var iskonto = $("#talep_sutun" + sutunid + " input[name=iskonto]").val()||0;
				var toplam_tahakkuk = $("#talep_sutun" + sutunid + " input[name=toplam_tahakkuk]").val()||0;
				var malzeme_durum = $("#talep_sutun" + sutunid + " select[name=malzeme_durum] option:selected").val();
				var stok_yer = $("#talep_sutun" + sutunid + " select[name=stok_yer] option:selected").val();
				var temin = $("#talep_sutun" + sutunid + " input[name=temin]").val();
				var temin_deger = $("#talep_sutun" + sutunid + " input[name=temin_deger]").val();
				var temin_kdurum = $("#talep_sutun" + sutunid + " input[name=temin_kdurum]").val();
				
				var eskimiktar = parseFloat($(this).attr("data-miktar"));
				var toplamurun=$("#toplamurun" + tlp_id).html()||0;
				//$("#toplamurun" + tlp_id).html((parseFloat(toplamurun)-parseFloat(eskimiktar))+parseFloat(miktar));
				
				
				if(miktar<0.1){
					Swal.fire({
						icon: 'error',
						title: 'Hata 2b !!!',
						text: 'En az 1 adet girmelisiniz !!!',
					})
				}
				
				birim_maliyet_yuzde5=(parseFloat(birim_maliyet)*1.05).toFixed(2);
				birim_maliyet_yuzde10=(parseFloat(birim_maliyet)*1.10).toFixed(2);
				birim_maliyet_yuzde25=(parseFloat(birim_maliyet)*1.25).toFixed(2);
				birim_maliyet_yuzde35=(parseFloat(birim_maliyet)*1.35).toFixed(2);
				
				
				if($("#talep_sutun" + sutunid + " input[name=birim_fiyat]").hasClass("sifirlama")){
					
				if(tur==1 && min_kar==2 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde5))){
					Swal.fire({
						icon: 'error',
						title: 'Hata 3-1a !!!',
						text: 'Satış Fiyatı en az '+ birim_maliyet_yuzde5 +' TL olmalıdır',
					})
					return false
				}
				
				
				if(tur==1 && min_kar==2 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde10))){
					Swal.fire({
						icon: 'warning',
						title: 'Hata 4-1a !!!',
						text: 'Satış Fiyatını %10 olan '+ birim_maliyet_yuzde10 +' TL den daha az belirledin',
					})
				}
				
				
				if(tur==1 && min_kar==1 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde25))){
					Swal.fire({
						icon: 'error',
						title: 'Hata 3a !!!',
						text: 'Satış Fiyatı en az '+ birim_maliyet_yuzde25 +' TL olmalıdır',
					})
					return false
				}
				
				
				if(tur==1 && min_kar==1 && (parseFloat(birim_fiyat)<parseFloat(birim_maliyet_yuzde35))){
					Swal.fire({
						icon: 'warning',
						title: 'Hata 4a !!!',
						text: 'Satış Fiyatını %35 olan '+ birim_maliyet_yuzde35 +' TL den daha az belirledin',
					})
				}
				}
				
				ToplamUrunAdet();
				
				var talepduzenle;
				talepduzenle=$.ajax({
                    type: "POST",
                    async: false,
                    cache: false,
					data: {tamirid:tamirid, stk_id_deger:stk_id_deger, iht_id:iht_id,  miktar:miktar, kdv_tur:kdv_tur, birim_maliyet:birim_maliyet, maliyet_kdv:maliyet_kdv, birim_fiyat:birim_fiyat, birim_kdv:birim_kdv, iskonto_orani:iskonto_orani, iskonto:iskonto, toplam_tahakkuk:toplam_tahakkuk, malzeme_durum:malzeme_durum, stok_yer:stok_yer, temin:temin, temin_deger:temin_deger, temin_kdurum:temin_kdurum},
                    url: "ajax/malzeme-duzenle.asp",
					beforeSend: function(){
						$("#talep_sutun" + sutunid).remove();
						$("#stk_id"+ sutunid +"_bilgi").remove();
						$("#malzemedetaybilgi" + sutunid).remove();
					},
                    success: function(response){
						if(response=="kapali"){
							SayfaYenile();
						}else{	
						$("#talep_sutun" + sonrakisutunid).before(response);
						
						var element = $("#talep_sutun" + sutunid);
						element.addClass('table-success',1000);
						setTimeout(function() {
							element.removeClass('table-success',1000);
						}, 800);
						
						//$("#talep_sutun" + sutunid).addClass('table-danger',2000);
						

						//$("#talep_sutun" + sutunid).animate({backgroundColor: '#aae861!important'}, 100);
						//$("#talep_sutun" + sutunid).animate({backgroundColor: '#FFF'}, 1000);
						}
                    },
                    error: function (jqXHR, exception) {
                        getErrorMessage(jqXHR, exception);
                    },
                });
				talepduzenle.abort();
                /*TalepToplamFiyat(satirid);*/
				GenelToplamFiyat();
			})			

$("body").on("click", ".malzemesil", function(){
				var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
				var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
				var tlp_id = $("#talep_sutun" + sutunid + " input[name=tlp_id]").val();
				var miktar = $(this).attr("data-miktar");
				var sip_id = $(this).attr("data-sip-id");
				var iddeger = String($(this).attr("data-id"));
				
				Swal.fire({
					icon: 'error',
					html:  'Malzemeyi silmek istediğinize emin misiniz?.',
					showCancelButton: true,
					confirmButtonText:'Onayla',
					cancelButtonText:'İptal'
					}).then((result) => {
						if (result.isConfirmed) {
							var toplamurun=$("#toplamurun" + tlp_id).html()||0;
							//$("#toplamurun" + tlp_id).html(parseFloat(toplamurun)-parseFloat(miktar));
							$("#toplamurun" + tlp_id).html(parseFloat(toplamurun)-1);
							ToplamUrunAdet();
							
							if(parseFloat($("#toplamurun" + tlp_id).html())==0){
								$("#talep_satir"+ satirid +" .tlpsil").addClass("talepiptal");
								$("#talep_satir"+ satirid +" .tlpsil").removeClass("d-none");
							}
							
							if(sip_id!=''){
								$("#talep_satir-99 #talep_sutun"+ sip_id).removeClass("d-none");
							}
							
							
							var malzemesil;
							malzemesil=$.ajax({
								type: "POST",
								async: false,
								cache: false,
								data: {malzemeid:iddeger, sip_id:sip_id},
								url: "ISLEM/tamirler-islem.asp?islem=malzemesil",
								success: function (response) {
									if(response=="kapali"){
										SayfaYenile();
									}else{
										$("#talep_sutun"+ iddeger).remove();
										$("#stk_id"+ iddeger +"_bilgi").remove();
										$("#malzemedetaybilgi"+ iddeger).remove();
									}
								},
								error: function (jqXHR, exception) {
									getErrorMessage(jqXHR, exception);
								},
							});
							malzemesil.abort();
							/*TalepToplamFiyat(satirid);*/
							GenelToplamFiyat();
						}
					})
					return false
				
				
			})	

$('body').on('click','.kdvdegis',function(){
				var sutunid=$(this).attr('sutun'); 
				
				var kdv_tur=$("#talep_sutun"+sutunid+" input[name=kdv_tur]").val()||0;
			
				Swal.fire({
				title: 'KDV Değiştir',
				html:  '<select name="swal_kdv_tur" id="swal_kdv_tur" class="form-control">'+
					   '<option value="6" data-kdv="1.20" data-kdvyazi="20" '+ ((kdv_tur==6)? "selected": "") +'>20</option>'+
					   '<option value="1" data-kdv="1.18" data-kdvyazi="18" '+ ((kdv_tur==1)? "selected": "") +'>18</option>'+
					   '<option value="5" data-kdv="1.10" data-kdvyazi="10" '+ ((kdv_tur==5)? "selected": "") +'>10</option>'+
					   '<option value="2" data-kdv="1.08" data-kdvyazi="8" '+ ((kdv_tur==2)? "selected": "") +'>8</option>'+
					   '<option value="3" data-kdv="1.01" data-kdvyazi="1" '+ ((kdv_tur==3)? "selected": "") +'>1</option>'+
					   '<option value="4" data-kdv="1.00" data-kdvyazi="0" '+ ((kdv_tur==4)? "selected": "") +'>0</option>'+
					   '</select>',
				showCancelButton: true,
				confirmButtonText:'Kaydet',
				cancelButtonText:'İptal'
				}).then((result) => {
					if (result.isConfirmed) {
						var swal_kdv_tur	=document.getElementById('swal_kdv_tur').value;
						var swal_kdv		=$('#swal_kdv_tur option:selected').attr('data-kdv');
						var swal_kdv_yazi	=$('#swal_kdv_tur option:selected').attr('data-kdvyazi');
						
						
						$("#talep_sutun"+sutunid+" .kdvdegis").html('KDV: %'+swal_kdv_yazi);
						$("#talep_sutun"+sutunid+" input[name=kdv_tur]").val(swal_kdv_tur);
						$("#talep_sutun"+sutunid+" input[name=kdv]").val(swal_kdv);
						
						SatirHesaplama(sutunid, 'birim_fiyat');
						
						GenelToplamFiyat();
						$("#talep_sutun"+sutunid+" .malzemeduzenle").trigger('click');
					}
				})
			});

$('body').on('click', '.telduzenle', function(e){
		var arac_id=$('input[name=arac_id]').val();
		var telefon1=$('input[name=app_telefon1]').val();
		var telefon2=$('input[name=app_telefon2]').val();
		var telefon3=$('input[name=app_telefon3]').val();
		
		
		$.ajax({
					type: "POST",
					data: {arac_id: arac_id, telefon1:telefon1, telefon2:telefon2, telefon3:telefon3},
					url: "ISLEM/app-telefon-islem.asp?islem=duzenle",
					success: function (data) {
						swal.fire("App telefonları güncellenmiştir !!!");
						return false
					}
				});
	})	

//##### Malzeme / İşçilik Listesi #####
$("body").on("click", ".malzemedetay", function(){
				var satirid = String($(this).closest(".tab").attr("id")).replace("talep_satir", "");
                var iddeger = String($(this).attr("data-id"));
				var tamirid = String($(this).attr("data-tamirid"));
				var stokid = String($(this).attr("data-stokid"));
				var firmaid = String($(this).attr("data-firma"));
				var tur = String($(this).attr("data-tur"));
                $("#malzeme-listesi #malzemedetaybilgi" + iddeger).fadeIn();
                //if ($("#malzemedetaybilgi" + iddeger + " td").html() == "") {
                    var malzemedetay;
					malzemedetay=$.ajax({
                        type: "POST",
                        async: false,
                        cache: false,
						data: {tamirid:tamirid, stokid:stokid, firmaid:firmaid, tur:tur, malzemeid:iddeger},
                        url: "ajax/malzeme-fatura-gecmisi.asp",
                        beforeSend: function(){
							$("#malzeme-listesi .malzemeeksi").addClass('badge-success');
							$("#malzeme-listesi .malzemeeksi").addClass('malzemedetay');
							$("#malzeme-listesi .malzemeeksi").html('+');	
							$("#malzeme-listesi .malzemeeksi").removeClass('badge-danger');
							$("#malzeme-listesi .malzemeeksi").removeClass('malzemeeksi');
							$("#malzeme-listesi .malzemedetaybilgi").css('display','none');
                            $("#malzeme-listesi #malzemedetaybilgi" + iddeger + " td").html('<img src="images/select2-spinner.gif" alt="" />');
                        },
                        success: function (response){
							$("#malzeme-listesi #malzemedetaybilgi" + iddeger ).css('display','table-row');
                            $("#malzeme-listesi #malzemedetaybilgi" + iddeger + " td").html(response);
							$("#talep_sutun"+iddeger +" .malzemedetay").addClass('badge-danger');
							$("#talep_sutun"+iddeger +" .malzemedetay").addClass('malzemeeksi');
							$("#talep_sutun"+iddeger +" .malzemedetay").html('-');
							$("#talep_sutun"+iddeger +" .malzemedetay").removeClass('malzemedetay');
							$("#talep_sutun"+iddeger +" .malzemedetay").removeClass('badge-success');
                        },
                        error: function (jqXHR, exception) {
                            getErrorMessage(jqXHR, exception);
                        },
                    });
					malzemedetay.abort();
               // }
            });

$("body").on("click", ".malzemeeksi", function(){
	var iddeger = String($(this).attr("data-id"));
	$("#talep_sutun"+iddeger +" .malzemeeksi").addClass('badge-success');
	$("#talep_sutun"+iddeger +" .malzemeeksi").addClass('malzemedetay');
	$("#talep_sutun"+iddeger +" .malzemeeksi").html('+');	
	$("#talep_sutun"+iddeger +" .malzemeeksi").removeClass('badge-danger');
	$("#talep_sutun"+iddeger +" .malzemeeksi").removeClass('malzemeeksi');
	$("#malzeme-listesi #malzemedetaybilgi"+iddeger ).css('display','none');
})	

$("body").on("click", ".garanti", function(){
				var sutunid = String($(this).closest("tr").attr("id")).replace("talep_sutun", "");
				var gelir_fr_id = $(this).attr("data-gelir-firma");
				var sh_id = $(this).attr("data-sh");
				var iht_id = $(this).attr("data-id");
				var fr_id = $(this).attr("data-firma");
				var fd_id = $(this).attr("data-fd");
				var miktar = $(this).attr("data-miktar");
				
				var islemtip=1;
				if($(this).hasClass("btn-warning")){
					$(this).removeClass("btn-warning");
					$(this).addClass("btn-danger");
					$(this).html('G.İPTAL');
					islemtip=1
				}else{
					$(this).removeClass("btn-danger");
					$(this).addClass("btn-warning");
					$(this).html('GARANTİ');
					islemtip=2
				} 
				
                var garantiislemi;
				garantiislemi=$.ajax({
                    type: "POST",
                    async: false,
                    cache: false,
					data: {gelir_fr_id:gelir_fr_id, sh_id:sh_id, iht_id:iht_id, fr_id:fr_id, fd_id:fd_id, miktar:miktar,  islem:islemtip},
                    url: "ISLEM/gelir-islem.asp?islem=garantiaktar",
                    success: function(response){
                    },
                    error: function(jqXHR, exception){
                        getErrorMessage(jqXHR, exception);
                    },
                });
				garantiislemi.abort();
            });

function WhatsApp(telefon) {
			var ph = '';
			// Check Device (Mobile/Desktop)
				var url_wa = 'https://web.whatsapp.com/send';
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					url_wa = 'whatsapp://send/';
				}
				// Get Value
					//via_url = location.href,
					var tarih=$("#acilis_tarihi").html(),
					ien =$("#ien_bilgi").html(),
					plaka =$(".plakasec").val(),
					arac_model=$("#marka option:selected").text()+' / '+ $("#seri option:selected").text() +' / '+ $("#model option:selected").text() +' / '+ $("#yil option:selected").text() +' / '+$("#yakit option:selected").text(),
					parca_listesi=$("#parca_listesi").val()
					
				$(this).attr('href', url_wa + '?phone=9'+ telefon +'&text=' +
               ' *Tarih*: ' + tarih + '%0A' +
			   '+ + + + + + + + + + + + + + + + + +%0A' +
			   ' *IEN*: ' + ien + '%0A' +
               '+ + + + + + + + + + + + + + + + + +%0A' +
               ' *Plaka* : ' + plaka + '%0A'+
			   ' *Araç* : ' + arac_model + '%0A'+
               '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _%0A' + 
			   parca_listesi
			   );
				var w = 960,
					h = 540,
					left = Number((screen.width / 2) - (w / 2)),
					tops = Number((screen.height / 2) - (h / 2)),
					popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
                popupWindow.focus();
				return false;
			
		}

function malzemeYazdir(){
	var newWin=window.open('','Print-Window');
	newWin.document.open();
	//newWin.document.write(data);
	newWin.document.write('<html><head><title>' + document.title  + '</title>');	
	newWin.document.write('<link rel="stylesheet" href="css/style.css" />');
	newWin.document.write('<link rel="stylesheet" href="css/table.css" />');
	newWin.document.write('<link rel="stylesheet" href="css/yazdir/tahsilat.css" />');
    newWin.document.write('</head><body style="margin-right:10px">');
	newWin.document.write(document.getElementById("malzeme-listesi").innerHTML);
	newWin.document.write('</body></html>');
	newWin.document.close();
	newWin.print();
	setTimeout(function(){newWin.close();},100);
}
 
$("body").on("click", ".kdveksi", function(){
	var isemri_kdvsiztahakkuk=$(".isemri_kdvsiztahakkuk").html().replaceAll('.','').replaceAll(',','.')
	var kdv=$(this).attr('title').replaceAll(',','.');
		
	$(this).closest("tr").addClass('table-danger');
	$(this).removeClass('kdveksi');
	$(this).addClass('kdvarti');
	
	var hesaplama=(parseFloat(isemri_kdvsiztahakkuk)-parseFloat(kdv)).toFixed(2).replaceAll('.',',')
	
	$(".isemri_kdvsiztahakkuk").html(sayi_to_para(hesaplama));
})

$("body").on("click", ".kdvarti", function(){
	var isemri_kdvsiztahakkuk=$(".isemri_kdvsiztahakkuk").html().replaceAll('.','').replaceAll(',','.')
	var kdv=$(this).attr('title').replaceAll(',','.');
		
	$(this).closest("tr").removeClass('table-danger');
	$(this).addClass('kdveksi');
	$(this).removeClass('kdvarti');
	
	var hesaplama=(parseFloat(isemri_kdvsiztahakkuk)+parseFloat(kdv)).toFixed(2).replaceAll('.',',')
	
	$(".isemri_kdvsiztahakkuk").html(sayi_to_para(hesaplama));
})	

$('body').on('blur','input[name=ihtiyac_sira]', function(){
	
	var items = $('.sortable').map(function () {
            return {
                value: parseInt($(this).val(), 10),
                a: $(this).data('tmr_id'),
                b: $(this).data('iht_id'),
				c: $(this).data('stk_id')
            };
        }).get();

        // Değerleri küçükten büyüğe sırala
        items.sort(function (x, y) {
            return x.value - y.value;
        });
	
	$('.sortable').each(function (index) {
		$(this).val(items[index].value);
        });
		
	var result = items
            .map(function (item) {
                return `${item.a}-${item.b}-${item.c}-${item.value}`;
            })
            .join('|');	
	
	
		var ihtiyacsiradegis;
		ihtiyacsiradegis=$.ajax({
            type: "POST",
            async: false,
            cache: false,
			data: {data:result},
            url: "ISLEM/tamirler-islem.asp?islem=ihtiyacsiradegis",
            success: function(response){
				$(".tab3baslik").trigger('click');
            },
            error: function(jqXHR, exception){
                getErrorMessage(jqXHR, exception);
            },
        });
		ihtiyacsiradegis.abort();
		
    });



//##### Tamir Notları #####
$('body').on('click','textarea[name=tamir_not]',function(){
	$("#not_cevap").val($(this).attr('notid'));	
})

$("body").on("click", ".cevapla", function(){
				$('.comment-main-level').next('.tamir_cevap').remove();
                var iddeger = String($(this).closest(".comment-main-level").attr("data-id"));
                if ($("#cevap" + iddeger).html() == undefined) {
                    $("#not" + iddeger).after(
                        '<div class="tamir_cevap" id="cevap' +
                            iddeger +
                            '"><section class="fieldset"><h1>TAMİR CEVAPLAYIN</h1><div class="row"><div class="col-md-12"><textarea name="tamir_not" maxlength="200" notid="'+ iddeger +'" class="kmax form-control" rows="10"></textarea></div></div><div class="row"><div class="col-md-12 text-center"><br /><button type="submit" class="btn btn-success">NOT EKLE</button></div></div></section></div>'
                    );
                }
            });



//##### Foto Galeri #####			
$('body').on('click','.fotosil',function(){	
	Swal.fire({
	title: 'Silmek istediğinize emin misiniz?',
	showCancelButton: true,
	confirmButtonText:'Foto Sil',
	cancelButtonText:'İptal'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href=$(this).attr('link');
			//alert($(this).attr('link'));
		} 
	})
})			




	
//##### Expertiz #####
function ExperHesapla(deger){
				var isemri_tahakkuk=jspara_to_sayi($(".isemri_tahakkuk").html()) || 0;
				var kdv_hesap=parseFloat($("#kdv_hesap").html()) || 0;
				
				var kdvsiz_tutar=parseFloat(isemri_tahakkuk)-parseFloat(kdv_hesap);
				var muafiyet_tutar=parseFloat($("#muafiyet_tutar").val()) || 0;
				var hasar_kdv_fark=parseFloat($("#hasar_kdv_fark").val()) || 0;
				
				var yuzde_oran=$("#tevkifat_yuzde option:selected").val();
				if(yuzde_oran==0){
					var hesaplanacaktutar=isemri_tahakkuk
				}else{
					var hesaplanacaktutar=kdvsiz_tutar	
				}
				
				$(".expertiz_musteri").html(muafiyet_tutar.toFixed(2));
				$(".expertiz_sigorta").html(((hesaplanacaktutar+hasar_kdv_fark)-muafiyet_tutar).toFixed(2));
				$(".expertiz_kdv_fark").html((hasar_kdv_fark).toFixed(2));
			}

$('body').on('click, mousedown, mouseup','#tamir_ekspertiz input,#tamir_ekspertiz select,#tamir_ekspertiz textarea',function(){
	$("#exper_degistirme").val(1);
});

$("body").on("change", "#tevkifat_yuzde", function(e) {
	var yuzde_oran=1-parseFloat(($("#tevkifat_yuzde option:selected").val()||0)/100);
	if(yuzde_oran==1){
		yuzde_oran=0
	}
	var kdv_hesap=parseFloat($("#kdv_hesap").html());
	$("#hasar_kdv_fark").val((kdv_hesap*yuzde_oran).toFixed(4));
	
	ExperHesapla(2);
	
})

$("body").on("change", "input[name=sigorta_tur]", function (e) {
                if ($("input[name=sigorta_tur]:checked").val() == 1) {
                    $("#anlasmasiz_sigorta").css("display", "block");
                    $("#anlasmali_sigorta").css("display", "none");
					$("#muafiyet_tutar").val(0);
					$("#hasar_kdv_fark").val(0);
					ExperHesapla(1);
                } else {
                    $("#anlasmali_sigorta").css("display", "block");
                    $("#anlasmasiz_sigorta").css("display", "none");
					ExperHesapla(2);
                }
            });

$("body").on("blur", "#muafiyet_yuzde, #muafiyet_tutar, #hasar_kdv_fark", function(e){
				ExperHesapla(2);			
			})

$("body").on("click", "a.tab6baslik", function(e){
				$("#tevkifat_yuzde").trigger("change");
			})

$("body").on("blur", "#muafiyet_yuzde", function(e){
				var isemri_tahakkuk=jspara_to_sayi($(".isemri_tahakkuk").html()) || 0;
				var muafiyet_yuzde=parseFloat($("#muafiyet_yuzde").val()) || 0;
				var yuzde_hesap=(muafiyet_yuzde/100)||0;
				$("#muafiyet_tutar").val((isemri_tahakkuk*yuzde_hesap).toFixed(4));
				ExperHesapla(2);			
			})

$("body").on("blur", "#muafiyet_tutar", function(e){
				var isemri_tahakkuk=jspara_to_sayi($(".isemri_tahakkuk").html()) || 0;
				var yuzdeodenecek=(isemri_tahakkuk/100)||0;
				
				if($(this).val()==0){
				$("#muafiyet_yuzde").val(0);
				}else{
				$("#muafiyet_yuzde").val(($(this).val()/yuzdeodenecek).toFixed(4));
				}
				ExperHesapla(2);			
			})
