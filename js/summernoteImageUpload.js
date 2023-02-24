$(document).ready(function() { 
    $('#summernote').summernote({
        height: 547,
        placeholder: "내용을 입력하세요",
        disableResizeEditor: true,
        lang: "ko-KR",
        toolbar: [
            // [groupName, [list of button]]
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
            ['color', ['forecolor','color']],
            ['table', ['table']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert',['picture','link','video']],
            ['view', ['fullscreen', 'help']]
        ],
        fontNames: ['맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
        fontNamesIgnoreCheck: ['맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
        fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
        
        
        onImageUpload : function(files){
            // 파일 업로드(다중업로드를 위해 반복문 사용)
            for (var i = files.length - 1; i >= 0; i--) {
                sendFile(files[i]);
                }
        }
        
    });
    
    function sendFile(file) {
        var data = new FormData();	
        data.append("file",file);
        $.ajax({
            type: "POST",
            url: "./server",
            type: 'POST',
            data: data,
            contentType: false,
            processData: false, // Don't process the files
            success: function(data) {
            $('#editor').summernote("insertImage", data.url);
            }
        });
    }
    
});