arrScaleDetails = {};

$(function(){
    $("select").select2();
    loadTable();
    
    $(document).on('click', ".nav-tabs li", function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
            $('.layer-tab').hide();
            $('#layer-tab' + $(this).data('layer')).show();
        }
        if ($(this).data('layer') == 1) {
            // $('#addAllChords').show();
        } else {
            // $('#addAllChords').hide();
        }
        
    });

    $('#select-key, #select-triad').change(function() {
        loadTable();
        $('#detailsArea').hide();
        $('#voicingsArea').hide();
    });
    
    $(document).on('click', ".clickable", function() {
        loadScaleDetails($(this));
    });
    
    $(document).on('click', ".chordLoad", function() {
        var key = $(this).data('key');
        var type = $(this).data('type');
        var orderedChords = getOrderedChords();
        var loadchords = [];
        
        loadchords = $.grep(orderedChords, function(e){ return e.form == type && e.key == key; });
        
        $('#voicingsArea').html('');
        $('#voicingsArea').append('<h4>' + key + type + ' voicings</h4>');
        loadChords(loadchords, 'voicingsArea');
        $('#voicingsArea').fadeIn();
        $(document.body).animate({ 'scrollTop':   $('#voicingsArea').offset().top }, 400);
    });
        
    
    function loadScaleDetails($this) {
        var mode=$this.children('th').data('scale');
        var chordlinks = '';
        var scaleDetails = arrScaleDetails[mode];
        var scaleform = '';
        $.each(scaleDetails.scaleform, function(i, item) {
            scaleform = scaleform + item + '&nbsp&nbsp';
        });
        // console.log (scaleDetails);
        // return false;
        var quality = 'falta';
        // var html = scaleDetails + '--' + 'triad/formula/steps/quality/Nmode/Namechords_link'
        var html = '<table><thead><tr><th class="modetitle">' + scaleDetails.scale + ' ' + scaleDetails.mode + '&nbsp;&nbsp;</th>' +
            '<th>(' + scaleDetails.triad + ' chords)' + '</th></tr><thead>' +
            '<tbody>' +
            '<tr><th>&nbsp; </th><td>&nbsp;</td>' +
            '<tr><th>Parent scale: </th><td>' + scaleDetails.parentkey + '</td>' +
            '<tr><th>Mode: </th><td>' + scaleDetails.nmode + '</td>' +
            '<tr><th>Quality: </th><td>' + scaleDetails.quality + '</td>' +
            '<tr><th>Scale formula: </th><td>' + scaleform + '</td>';
        
        $.each(scaleDetails.chords, function(chordname, chord) {
            chordlinks = chordlinks + '<a href="#" class="chordLoad" data-key="' + chord.key + '" data-type="' + chord.type + '">' + chord.key + chord.type + '&nbsp;&nbsp;</a>';
        });
        
        var html = html + '<tr><th>Scale chords: </th><td>' + chordlinks + '</td>';
        $('#detailsArea').html(html);
        
        $('#detailsArea').fadeIn();
        $(document.body).animate({ 'scrollTop':   $('#detailsArea').offset().top }, 400);
        
    }
    
    
    $(document).on('mouseenter', ".clickable", function() {
        var targetClass = $(this).data('target');
        $(targetClass).siblings('.collapse').hide();
        $(targetClass).show();
    });
    
    $('#select-triad').change(function() {
        triad=$(this).val();
        if (triad == 'triad') {
            $('.triads').show();
            $('.seventh').hide();
        } else {
            $('.triads').hide();
            $('.seventh').show();
        }
    });
    


    function loadHeader() {
        $('.triads').html('<th style="visibility:hidden"></th>');
        $('.seventh').html('<th style="visibility:hidden"></th>');
        var html = '';
        var i = ind = 0;
        for(i = 0; i < 14; i++) {
            index = i%7;
            html = '<th>' + triads[index] + '</th>';
            ind = ind % 7;
            if (steps[index] == 'W') {
                html = html + '<th></th>';
            } 
            $('.triads').append(html);
        }
        
        var i = ind = 0;
        for(i = 0; i < 14; i++) {
            index = i%7;
            html = '<th>' + seventh[index] + '</th>';
            ind = ind % 7;
            if (steps[index] == 'W') {
                html = html + '<th></th>';
            } 
            $('.seventh').append(html);
        }
        
    }
    
    function getChordFunction(y, tone, steplength, column) {
        var type = chord = suffix = prefix = upper = ''
        var chordfunction = romanfunc[steplength-1][y%steplength]
        triad=$('#select-triad').val();
        if (triad == 'triad') {
            chord = $('.triads th:nth(' + (column + 1) + ')').html();
        } else {
            chord = $('.seventh th:nth(' + (column + 1) + ')').html();
            suffix = '7';
        }
        
        var bemol = tone.indexOf("♭");
        if (bemol != -1) {
            prefix = '♭';
        }
        
        var sharp = tone.indexOf("♯");
        if (sharp != -1) {
            prefix = '♯';
        }
        
        var maj = chord.indexOf("Maj");
        if (maj == -1) {
            if (triad == 'seventh') {
                type = 'min7'
            } else {
                type = 'min'
            }
            var dom = chord.indexOf("Dom");
            if (dom != -1) {
                type = '7'
                upper = true;
            }
        } else {
            upper = true;
            type = ''
            if (triad == 'seventh') {
                suffix = 'maj7';
                type = 'Δ7'
            }
        }
        
        if (upper == true) {
            chordfunction = chordfunction.toUpperCase();
        }
        
        if (column == 11) {
            if (triad == 'seventh') {
                chordfunction = prefix + chordfunction + '7♭5';
                type = 'm7♭5';
            } else {
                chordfunction = prefix + chordfunction + '°';
                type = 'dim';
            }
        } else {
            chordfunction = prefix + chordfunction + suffix;
        }
        
        return {chordfunction: chordfunction, type: type}
    }
    
    function loadTable() {
        arrScaleDetails = {};
        loadHeader();
    
    $('tbody').html('');
    var key=$('#select-key').val();
    var triad=$('#select-triad').val();
    
    var tbody = '';
    
    var i = j= jind = 0;
    
    $.each(scales, function(ind, scale) {
        var scalekey = keyscale[key][tonestable[tones[scale.root]][0]];
        arrScaleDetails[ind] = {mode: ind, nmode: scale.root, scale: scalekey, parentkey: key, triad: triad, scaleform: scale.form, chords: {}, quality: scale.quality};
        // var html = key + ' -- ' + mode + '--' + 'triad/formula/steps/quality/Nmode/Namechords_link'
        

        var tbody = '<tr class="collapse row' + i + ' scaleformula"><th class="warning"></th></tr>' +
        '<tr class="clickable" data-toggle="collapse" id="row' + i + '" data-target=".row' + i + '"></tr>' +
        '<tr class="collapse row' + i + ' chordfunction"><th class="warning"></th></tr>';

        $('tbody').append(tbody);
        
        var header = '<th data-scale="' + ind + '">' + scalekey + ' ' + ind + '</th>';

        var html = scaleFormulaHtml = chordFunctionHtml = chordFunction =  '';
        var y = 0;
        for(j = 0; j < 24; j++) {
            jind = j%12;
            var tonesroot = tones[scale.root];
            var keyname = keyscale[key][tonestable[jind][0]];

            var scaleTrans = [];
            $.each(scale.form, function(subind, tone) {
                scaleTrans.push((tones[tone] + tonesroot) % 12);
            });

            var classInfo = "";
            if ($.inArray(tones[tonestable[jind][0]]%12, scaleTrans) != -1) {
                classInfo = " boldinfo ";
                if (j<tonesroot || j > tonesroot +12) {
                    scaleFormulaHtml = scaleFormulaHtml + '<td class="warning"></td>';
                    chordFunctionHtml = chordFunctionHtml + '<td class="warning"></td>';
                }
                    
                if (j >= tonesroot && j <= tonesroot + 12) {
                    classInfo = classInfo + " info ";
                    var steplength = scale.form.length;
                    var step = y % steplength;
                    
                    scaleFormulaHtml = scaleFormulaHtml + '<td class="warning">' + scale['form'][step] + '</td>';
                    chordFunction = getChordFunction(y, scale['form'][step], steplength, jind);
                    arrScaleDetails[ind]['chords'][chordFunction.chordfunction] = {type: chordFunction.type, key: keyname, scale: scalekey};
        
                    chordFunctionHtml = chordFunctionHtml + '<td class="warning">' + chordFunction.chordfunction + '</td>';
                    y = y + 1;
                }
            } else {
                classInfo = " greyedinfo ";
                scaleFormulaHtml = scaleFormulaHtml + '<td class="warning"></td>';
                chordFunctionHtml = chordFunctionHtml + '<td class="warning"></td>';
            }

            html = html + '<td class="active '  + classInfo + '">' + keyname;
            if (typeof tonestable[jind][1] != 'undefined') {
                var keyname_alt = keyscale[key][tonestable[jind][1]];
                html = html + '<br />' + keyname_alt;
            }
             html = html + '</td>';
        }

        $('#row' + i).append(header + html);
        $('.row' + i + '.scaleformula').append(scaleFormulaHtml);
        $('.row' + i + '.chordfunction').append(chordFunctionHtml);
        
        i = i + 1;
    });

    }

});


