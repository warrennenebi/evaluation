(function($) {
		/*
		* 検索機能付き セレクトボックス/Select box with search function
		*
		* Copyright (c) 2020 iseyoshitaka
		*/
		$.fn.searchBox = function(opts) {

		// 引数に値が存在する場合、デフォルト値を上書きする
		//Override the default value if the argument has a value
		var settings = $.extend({}, $.fn.searchBox.defaults, opts);
		
		var init = function (obj) {

			// console.log(obj);
			var self = $(obj),
				parent = self.closest('div,tr'),
				searchWord = ''; // 絞り込み文字列/filter string
			
			// 絞り込み検索用のテキスト入力欄の追加 
			//Adding a text input field for narrowing search
			self.before('<input type="text" class="form-control form-control-sm refineText '+obj.id+' formTextbox" />');
			var refineText = parent.find('.refineText');
			if (settings.mode === MODE.NORMAL) {
				refineText.attr('readonly', 'readonly');
			}
			
			// 初期表示で選択済みの場合、絞り込み文言入力欄に選択済みの文言を表示 
			//If it is already selected in the initial display, the selected wording will be displayed in the filter wording input field.
			var selectedOption = self.find('option:selected');
			if(selectedOption){
				refineText.val(selectedOption.text());
				if (selectedOption.val() === '') {
					if (settings.mode === MODE.TAG) {
						refineText.val("");
					}
				}
			}

			// セレクトボックスの代わりに表示するダミーリストを作成 
			//Create a dummy list to display instead of the select box
			var visibleTarget =self.find('option').map(function(i, e) {
				// console.log($(e));class="'+$(e).data('classer')+'
				//set locker for filtering
				let locker="";
				if ($(e).data('locker')!== undefined && $(e).data('locker') !== false) {
					locker=$(e).data('locker')
				}
				return '<li data-selected="off" data-searchval="' + $(e).val() + '" data-locker="'+locker+'" "><span>' + $(e).text() + '</span></li>';
			}).get();
			self.after($('<ul class="searchBoxElement"></ul>').hide());

			// ダミーリストの表示幅をセレクトボックスにあわせる
			//Match the display width of the dummy list to the select box
			var refineTextWidth = (settings.elementWidth) ? settings.elementWidth : self.width();
			// refineText.css('width', refineTextWidth);
			// parent.find('.searchBoxElement').css('width', refineTextWidth);

			// 元のセレクトボックスは非表示にする
			//Hide the original select box
			self.hide();

			// ダミーリストを検索条件で絞り込みます。
			//Filter the dummy list with search conditions.
			var changeSearchBoxElement = function() {
				if (searchWord !== '') {
					var matcher = new RegExp(searchWord.replace(/\\/g, '\\\\'), "i");
					var filterTarget = $(visibleTarget.join()); // 配列のコピー //array copy
					filterTarget = filterTarget.filter(function(){
						return $(this).text().match(matcher);
					});
					parent.find('.searchBoxElement').empty();
					parent.find('.searchBoxElement').html(filterTarget);
					parent.find('.searchBoxElement').show();
				} else {
					parent.find('.searchBoxElement').empty();
					parent.find('.searchBoxElement').html(visibleTarget.slice(0, settings.optionMaxSize).join(''));
					parent.find('.searchBoxElement').show();
				}
				
				// 選択中のLIタグの背景色を変更します。
				// Change the background color of the selected LI tag.
				var selectedOption = self.find('option:selected');
				if(selectedOption){
					parent.find('.searchBoxElement').find('li').removeClass('selected');
					parent.find('.searchBoxElement').find('li[data-searchval="' + selectedOption.val() + '"]').addClass('selected');
				}
				
				// ダミーリスト選択時
				//When dummy list is selected
				parent.find('.searchBoxElement').find('li').click(function(e){
					e.preventDefault();
					// e.stopPropagation();
					var li = $(this),
						searchval = li.data('searchval');
					self.val(searchval).change();
					parent.find('li').attr('data-selected', 'off');
					li.attr('data-selected', 'on');
				});

			};

			// keyup時のファンクション
			//Function at keyup
			refineText.keyup(function(e){
				searchWord = $(this).val();
				// ダミーリストをリフレッシュ
				//refresh dummy list
				changeSearchBoxElement();
			});

			// セレクトボックス変更時
			//When changing the select box
			self.change(function(){
				// 直近の絞り込み文言エリアへ選択オプションのテキストを反映
				//Reflect selected option text in the most recent refinement wording area
				var selectedOption = $(this).find('option:selected');
				searchWord = selectedOption.text();
				refineText.val(selectedOption.text());

				if (settings.selectCallback) {
					settings.selectCallback({
						selectVal: selectedOption.attr('value'),
						selectLabel: selectedOption.text()
					});
				}
			});

			// テキストボックスをクリックした場合はダミーリストを表示する
			//Show dummy list if textbox is clicked
			refineText.click(function(e) {
				e.preventDefault();

				// モードに合わせて設定
				//Set according to mode
				if (settings.mode === MODE.NORMAL) {
					searchWord = '';
				} else if (settings.mode === MODE.INPUT) {
					refineText.val('');
					searchWord = '';
				} else if (settings.mode === MODE.TAG) {
					var selectedOption = self.find('option:selected');
					if (selectedOption.val() === '') {
						refineText.val('');
						searchWord = '';
					}
				}

				// ダミーリストをリフレッシュ
				//refresh dummy list
				parent.find('.searchBoxElement').hide();
				changeSearchBoxElement();
				
			});
			
			// セレクトボックスの外をクリックした場合はダミーリストを非表示にする。
			// Hide the dummy list if you click outside the select box.
			$(document).click(function(e){
				if($(e.target).hasClass('refineText')){
					return;
				}
				parent.find('.searchBoxElement').hide();
				if (settings.mode !== MODE.TAG) {
					var selectedOption = self.find('option:selected');
					searchWord = selectedOption.text();
					refineText.val(selectedOption.text());
				}
			});


			//show original select and destroy dummy list

		}

		$(this).each(function (){
			init(this);
		});

		return this;
	}
	
	var MODE = {
		NORMAL: 0, // 通常のセレクトボックス //normal select box
		INPUT: 1, // 入力式セレクトボックス //input select box
		TAG: 2 // タグ追加式セレクトボックス //Add tag select box
	};

	$.fn.searchBox.defaults = {
		selectCallback: null, // 選択後に呼ばれるコールバック //callback called after selection
		elementWidth: null, // セレクトボックスの表示幅 //Display width of select box
		optionMaxSize: 10000, // セレクトボックス内に表示する最大数 //Maximum number to display in the select box
		mode: MODE.INPUT // 表示モード //Display mode
	};

})(jQuery);
