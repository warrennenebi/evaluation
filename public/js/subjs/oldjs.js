//filtrages des cedantes par pays
// $('body').on('change','.pays_assure_group select', function () {
//     // console.log('ok');
//     $('.transferor_id_group select').val('');
//     createOptionvalue('cedantes','pays_assure');
// })
// $('body').on('mouseenter','.transferor_id_group input', function () {

//     let id_pays=$('select#pays_assure').children("option:selected").data('locker');

//     let listeTransferor;

    // setTimeout(function() {
    //     listeTransferor=$('select#transferor_id option');
    //     for (let index = 0; index < listeTransferor.length; index++) {
    //         // && $('.transferor_id_group .searchBoxElement li').eq([index]).data('locker')!==""
    //         if ($('select#transferor_id option').eq([index]).data('locker')!==id_pays) {
    //             $('select#transferor_id option').eq([index]).data("classer","d-none");
    //             // console.log($('.transferor_id_group .searchBoxElement li').eq([index]));      
    //         }
    //         if ($('select#transferor_id option').eq([index]).data('locker')==id_pays && $('select#transferor_id option').eq([index]).hasClass('d-none')) {
    //             $('select#transferor_id option').eq([index]).data("classer","");;
    //         }
    //     }
    //     // console.log(id_pays);
    // },5);
    // setTimeout(function() {
    //     listeTransferor=$('.transferor_id_group .searchBoxElement')[0].children;
    //     for (let index = 0; index < listeTransferor.length; index++) {
    //         // && $('.transferor_id_group .searchBoxElement li').eq([index]).data('locker')!==""
    //         if ($('.transferor_id_group .searchBoxElement li').eq([index]).data('locker')!==id_pays) {
    //             $('.transferor_id_group .searchBoxElement li').eq([index]).attr("hidden", "true");
    //             // console.log($('.transferor_id_group .searchBoxElement li').eq([index]));      
    //         }
    //     }
    //     // console.log(id_pays);
    // },5);
    
// })
$("body").on('mouseenter','.dataOptions', function(){
    var content_name='';
    if ($(this).attr('id')=='transferor_id') {
        content_name='transferor_id'
    }
    const url = 'storage/'+content_name+'.json';

	const request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function() {
		if (request.status === 200) {
			const data = JSON.parse(request.responseText).data;
            tableJson[content_name]=data;
		} else {
		// Reached the server, but it returned an error
		}   
	}

	request.onerror = function() {
		console.error('An error occurred fetching the JSON from ' + url);
	};

	request.send();
})

$("body").on('focus','#transferor_id',function(){
    var content_name='';
    if ($(this).attr('id')=='transferor_id') {
        content_name='transferor_id'
    }
    // $("#transferor_id_result").hide('');
    console.log(tableJson[content_name]);
    tableJson[content_name].forEach(element => {
        console.log(element);
        if (element.pays_id ==45){
            $('#transferor_id_result').append('<li class="list-group-item link-class" data-locker='+element.pays_id+' data-id='+element.id+'>'+element.raison_social+'</li>');
        }
    });     
    $('#transferor_id_result').show();
});
$("body").keyup('#transferor_id',function(){
    var content_name='';
    if ($(this).attr('id')=='transferor_id') {
        content_name='transferor_id'
    }
    var searchField = $('#transferor_id').val();
    var expression = new RegExp(searchField, "i");
    $.each(tableJson[content_name], function(key, value){
        if (value.raison_social.search(expression) != -1){
            $('#transferor_id_result li[data-id="'+value.id+'"]').addClass('d-none');
        }
        else{
            $('#transferor_id_result li[data-id="'+value.id+'"]').removeClass('d-none');
        }
    });
});
$("body").focusout('#transferor_id,#transferor_id_result',function(){
    $("#transferor_id_result").hide('');
})
// $("body").on('click', '#transferor_id_result li', function() {
//     //var click_text = $(this).text().split('|');
//     //$('#identifiantagent').val($.trim(click_text[0].charAt(0).toUpperCase() + click_text[0].slice(1)));
//     $('#transferor_id').val($(this).text());
//     $("#transferor_id_result").html('');

// });

// {{-- <input name="transferor_id" id="transferor_id" type="text" class="form-control dataOptions" required />
// <ul class="list-group listgroupover" id="transferor_id_result"></ul> --}}


// $.getJSON(url, function (data) {
    //     $('#transferor_id').select2({
    //             data: data
    //         });
//     // let content_name='';
//     var JsData="";

//     // content_name=$(this).data('jsonlink')
    // const url = '';
//         JsData=data.data;
//             .empty()
//             .append('<option value=""></option>');
        
//         $.each(JsData, function (key, value) {
//             if (value.pays_id==type) {
//                 // Now, fill the second dropdown list with linked content.
//                 $('#transferor_id').append('<option value="' + value.id + '">' + value.raison_social + '</option>');
//             }
//         });
// });