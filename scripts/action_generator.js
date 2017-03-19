$(function(){
    urlchords = parseUrl();
    if (urlchords == true) {
        loadFilteredChords();
    } else {
        var title = decodeURIComponent(window.location.search.split("&")[1].split("=")[1]);
        $('#titleinput').val(title);
        loadUrlChords(urlchords);
    }
    
    $("select").select2();
    
    $(document).on('click', ".nav-tabs li", function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
            $('.layer-tab').hide();
            $('#layer-tab' + $(this).data('layer')).show();
        }
        if ($(this).data('layer') == 1) {
            $('#addAllChords').show();
            loadFilteredChords();
        } else {
            $('#addAllChords').hide();
            loadCustomChord();
        }
        
    });
    
    $('#select-key-custom, #select-type-custom, #select-bass-note-custom').change(function() {
        loadCustomChord();
    });
    
    $('.ifing, .ifret').change(function() {
        loadCustomChord();
    });

    $(document).on('click','input[type=text]',function(){ this.select(); });
        
    $('#select-key, #select-type, #select-bass-note').change(function() {
        loadFilteredChords();
    });
    
    $('#button-clone').click(function() {
        clonePreviewAreaToPrintArea();
    });
    
    $('#button-print').click(function() {
        window.print();
    });
    
    $(document).on('click', '#previewArea .chorddiv', function() {
        fadeInPreview();
        $(this).clone().appendTo('#printArea').hide().fadeIn();
        changeLink();
        changeTooltip();
    });
    
    $(document).on('blur', '#titleinput', function() {
        changeLink();
    });

    $(document).on('click', '#chordsheet .chorddiv', function() {
        $(this).remove();
        // destroy all current tooltips, if not the current tooltip hangs forever
        $('.tooltip').remove();
        if (changeLink() == 0) {
            $('#chordsheet').hide();
        }
    });

    function clonePreviewAreaToPrintArea() {
        fadeInPreview();
        $('#previewArea .chorddiv').clone().appendTo('#printArea').hide().fadeIn();
        changeLink();
        changeTooltip();
    }

    function fadeInPreview() {
        if ($('#chordsheet').is(":hidden")) {
            $('#chordsheet').fadeIn();
            $(document.body).animate({ 'scrollTop':   $('#chordsheet').offset().top }, 400);
        }
    }
    
    function changeTooltip() {
        $('#chordsheet .chorddiv').attr('title', 'Click to remove from sheet');
        $('[data-toggle="tooltip"]').tooltip()
    }
    
    function loadUrlChords(chords) {
        //$.each(chords, function(ind, chord) {
            //chord = validateChord(chord.key, chord.form, chord.inv, chord.fret, chord.fing);
            //});
        loadChords(chords);
        clonePreviewAreaToPrintArea();
        // colapsar o hide de la parte de edición
    }
    
    
    function parseUrl () {
        var parsedurl = window.location.search.split("&")[0].replace("?","").split("=")[1]
        // parsedurl = window.location.search.split('=')[1];
        if (parsedurl == false || typeof parsedurl == 'undefined') {
            return true;
        } else {
            return JSON.parse(decodeURIComponent(parsedurl));
        }
    }
    
    
    function loadFilteredChords () {
        // chord data
        var key=$('#select-key').val();
        var type=$('#select-type').val();
        var inv=$('#select-bass-note').val();
        
        var results = getOrderedChords();
                
        if (key != '*') {
            var results = $.grep(results, function(e){ return e.key == key; });
        }

        if (type != '*') {
            var results = $.grep(results, function(e){ return e.form == type; });
        }
        
        if (inv != '0') {
            var results = $.grep(results, function(e){ return e.inv == inv; });
        }
        
        $('#previewArea').html('');
        loadChords(results);
    }

    function changeLink() {
        var title = $('#titleinput').val();
        var shareurl = [];
        $('#chordsheet .chorddiv').each(function() {
            id = $(this).attr('id');
            shareurl.push(arrchordsurl[id]); 
        });
        queryStr = encodeURIComponent(JSON.stringify(shareurl));
        title = encodeURIComponent(title);
        $('#sharelink').attr('href', '?param=' + queryStr + '&title=' + title);
        
        return shareurl.length;
    }
});
