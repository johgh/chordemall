$(function(){
    
    $("select").select2();
    loadMoveableChords();
    $('#key-anchors').append(loadAnchors());
    
    
    $(document).on('click', ".nav-tabs li", function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
            $('.layer-tab').hide();
            $('#layer-tab' + $(this).data('layer')).show();
        }
        if ($(this).data('layer') == 1) {
            loadMoveableChords();
        } else {
            loadAllChords();
        }
        
    });
    
    $('#select-key-moveable').change(function() {
        loadMoveableChords();
    });
    
    $(document).on('click', '.seemoveable', function() {
        var chordtype = $(this).data('chordtype');
        var chordkey = $(this).data('chordkey');
        $('.nav-tabs li[data-layer=1]').trigger('click');
        $('#select-key-moveable').val(chordkey).trigger('change');
        window.location.href = '#' + chordkey + '-' + chordtype + '-anchor';
    });
    
    function loadAnchors () {
        var anchorsStr = ''
        $.each(keytones, function(keyname, key) {
            anchorsStr = anchorsStr + '<a href="#' + keyname + '-anchor">' + keyname + '</a>&nbsp;&nbsp; - &nbsp;&nbsp;';
        });
        anchorsStr = anchorsStr.substr(0, anchorsStr.length-27);
        return anchorsStr;
    }
    
    function loadChordTypes (keyname) {
        var details = 'popover content';
        var content = 'Select a type to see different voicings of the chord <a tabindex="0" class="btn btn-xs btn-info" data-html="true" role="button" data-toggle="popover" data-trigger="focus" title="Different voicings of a chord" data-content="Although a chord type has always the same tones, different voicings allow to play the chords in the «convenient way», depending on context.<br /><br />For moveable chords, for example, it is important to know at least one voicing on the 6th and one on the 5th string.<br /><br />Different voicings also allow for different sonorities depending on the exact sequence of tones played (which is shown below each chord chart)"> <i class="fa fa-question-circle" aria-hidden="true"></i> </a> <br />'
        $.each(f_order, function(ind, typename) {
            content = content + '<a href="#' + keyname + '-' + typename + '-anchor">' + keyname + typename + '</a>' + '&nbsp;&nbsp; | &nbsp;&nbsp;';
        });
        content = content.substr(0, content.length-27);
        
        var panel = '<div class="panel panel-info"><div class="panel-heading"><h4 id="' + keyname + '-anchor"><a class="header-link" href="#' + keyname + '-anchor"><i class="fa fa-link"></i></a>' + keyname + '</h4></div>' +
        '<div class="panel-body">' + content + '</div></div>';
        return panel;
    }
    
    function loadMoveableChords() {
        $('#moveableChordsArea').html('');
        var keyname = $('#select-key-moveable').val();
        var chordTypes = loadChordTypes(keyname);
        $('#moveableChordsArea').append(chordTypes);
        $('[data-toggle="popover"]').popover()
        $.each(f_order, function(ind, typename) {
            var results = $.grep(chords, function(e){ return typeof e.mov != 'undefined'; });
            results = $.grep(results, function(e){ return e.form == typename; });
            
                if (results.length != 0) {
                    $('#moveableChordsArea').append('<h6 id="' + keyname + '-' + typename + '-anchor"><a class="header-link" href="#' + keyname + '-' + typename + '-anchor"><i class="fa fa-link"></i></a>' + keyname + '' + typename + '</h6>');
                }
                
            
            var chordresults = addChordsToKey(results, keyname);
            loadChords(chordresults, 'moveableChordsArea');
        });
    }

    function getOpenMoveableChords () {
        var results = $.grep(chords, function(e){ return typeof e.mov != 'undefined'; });
        var chordresults = addChordsToKey(results);
        return chordresults;
    }
    
    function loadAllChords () {
        var openMoveableChords = getOpenMoveableChords();
        
        $('#keyChordsArea').html('');
        $.each(keytones, function(keyname, key) {
            var chordTypes = loadChordTypes(keyname);
            $('#keyChordsArea').append(chordTypes);
            $('[data-toggle="popover"]').popover()
            $.each(f_order, function(ind, typename) {
                var results = $.grep(chords, function(e){ return e.key == key });
                results = $.grep(results, function(e){ return e.form == typename; });
                
                openMoveableResults = $.grep(openMoveableChords, function(e){ return e.key == keyname && e.form == typename; });
                results = openMoveableResults.concat(results);
                
                if (results.length != 0) {
                    $('#keyChordsArea').append('<h6 id="' + keyname + '-' + typename + '-anchor"><a class="header-link" href="#' + keyname + '-' + typename + '-anchor"><i class="fa fa-link"></i></a>' + keyname + '' + typename + '</h6>');
                }
                
                var chordresults = addChordsToKey(results, keyname);
                
                loadChords(chordresults, 'keyChordsArea');
            });
        });
    }
});
