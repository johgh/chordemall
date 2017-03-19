    arrchordsurl = {};
    id = 0;
    
    /* MODES THEORY */
    
    scales = {
        'Major (Ionian)': {'root': '1', 'form': ['1', '2', '3', '4', '5', '6', '7', '8'], 'quality': 'major'},
        'Dorian': {'root': '2', 'form': ['1', '2', '♭3', '4', '5', '6', '♭7', '8'], 'quality': 'minor'},
        'Phyrgian': {'root': '3', 'form': ['1', '♭2', '♭3', '4', '5', '♭6', '♭7', '8'], 'quality': 'minor'},
        'Lydian': {'root': '4', 'form': ['1', '2', '3', '♯4', '5', '6', '7', '8'], 'quality': 'major'},
        'Mixolydian': {'root': '5', 'form': ['1', '2', '3', '4', '5', '6', '♭7', '8'], 'quality': 'dominant'},
        'Minor (Aeolian)': {'root': '6', 'form': ['1', '2', '♭3', '4', '5', '♭6', '♭7', '8'], 'quality': 'minor'},
        // 'Melodic minor': {'root': '6', 'form': ['1', '2', '♭3', '4', '5', '6', '7', '8'], 'quality': 'minor'}, // cambian los grados y los acordes, no cuadra con el modo de calcularlos actualmente, ni el dato 'parent key'
        'Locrian': {'root': '7', 'form': ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7', '8'], 'quality': 'diminished'},
        'Major Pentatonic': {'root': '1', 'form': ['1', '2', '3', '5', '6', '8'], 'quality': 'major'},
        'Minor Pentatonic': {'root': '6', 'form': ['1', '♭3', '4', '5', '♭7', '8'], 'quality': 'minor'},
    };

    scales_order = ['Major Pentatonic', 'Minor Pentatonic', 'Major (Ionian)', 'Dorian', 'Phyrgian', 'Lydian', 'Mixolydian', 'Minor (Aeolian)', 'Locrian' ];


    romanfunc = {'7' : ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'i'],
                 '5' : ['i', 'ii', 'iii', 'v', 'vi', 'i']};

    triads = ['Maj', 'min', 'min', 'Maj', 'Maj', 'min', 'dim', 'Maj'];
    seventh = ['Maj7', 'min7', 'min7', 'Maj7', 'Dom', 'min7', 'm7♭5', 'Maj7'];
    steps = ['W', 'W', 'H', 'W', 'W', 'W', 'H', 'W'];
    // steps = ['W', '',  'W', '', 'H', 'W', '', 'W', '', 'W', '', 'H', 'W', ''];
    
    /* MODES THEORY */
    
    
    /* included all different keys, but not theoretical (D♯ E♯  F♭  G♯  A♯  B♯ C♭ C♯)*/
    keytones = {'C': '0', 'D♭': '1', 'D': '2', 'E♭': '3', 'E': '4', 'F': '5', 'F♯': '6', 'G♭': '6', 'G': '7', 'A♭': '8', 'A': '9', 'B♭': '10', 'B': '11'};
    // with theoretical keytones:
    // keytones = {'C': '0', 'C♯': '1', 'D♭': '1', 'D': '2', 'D♯': '3', 'E♭': '3', 'E': '4', 'F': '5', 'F♯': '6', 'G♭': '6', 'G': '7', 'G♯': '8', 'A♭': '8', 'A': '9', 'A♯': '10', 'B♭': '10', 'B': '11'};
    
    keyscale = {'C':  {'1': 'C','2':'D', '3':'E', '4':'F', '5':'G', '6':'A', '7':'B', '♭2': 'D♭',       '♯2': 'D♯', '♭3': 'E♭',  '♯4': 'F♯', '♭5': 'G♭',   '♯5': 'G♯', '♭6': 'A♭', '♭7': 'B♭' },
                    'D♭': {'1':'D♭','2':'E♭','3':'F', '4':'G♭','5':'A♭','6':'B♭','7':'C', '♭2': 'E𝄫',  '♯2': 'E', '♭3': 'F♭',  '♯4': 'G', '♭5': 'A𝄫',   '♯5': 'A', '♭6': 'B𝄫', '♭7': 'C♭'},
                    'D':  {'1':'D', '2':'E', '3':'F♯','4':'G', '5':'A', '6':'B', '7':'C♯','♭2': 'E♭',   '♯2': 'E♯', '♭3': 'F',   '♯4': 'G♯', '♭5': 'A♭',   '♯5': 'A♯', '♭6': 'B♭', '♭7': 'C' },
                    'E♭': {'1':'E♭','2':'F', '3':'G', '4':'A♭','5':'B♭','6':'C', '7':'D', '♭2': 'F♭',   '♯2': 'F♯', '♭3': 'G♭',  '♯4': 'A', '♭5': 'B𝄫',  '♯5': 'B', '♭6': 'C♭', '♭7': 'D♭'},
                    'E':  {'1':'E', '2':'F♯','3':'G♯','4':'A', '5':'B', '6':'C♯','7':'D♯','♭2': 'F',    '♯2': 'F𝄪', '♭3': 'G',  '♯4': 'A♯', '♭5': 'B♭',   '♯5': 'B♯', '♭6': 'C', '♭7': 'D' },
                    'F':  {'1':'F', '2':'G', '3':'A', '4':'B♭','5':'C', '6':'D', '7':'E', '♭2': 'G♭',   '♯2': 'G♯', '♭3': 'A♭',  '♯4': 'B', '♭5': 'C♭',   '♯5': 'C♯', '♭6': 'D♭', '♭7': 'E♭' },
                    'F♯': {'1':'F♯','2':'G♯','3':'A♯','4':'B', '5':'C♯','6':'D♯','7':'E♯','♭2': 'G',    '♯2': 'G𝄪', '♭3': 'A',  '♯4': 'B♯', '♭5': 'C',    '♯5': 'C𝄪', '♭6': 'D', '♭7': 'E'},
                    'G♭': {'1':'G♭','2':'A♭','3':'B♭','4':'C♭','5':'D♭','6':'E♭','7':'F', '♭2': 'A𝄫',  '♯2': 'A', '♭3': 'B𝄫', '♯4': 'C', '♭5': 'D𝄫',   '♯5': 'D', '♭6': 'E𝄫', '♭7': 'F♭'},
                    'G':  {'1':'G', '2':'A', '3':'B', '4':'C', '5':'D', '6':'E', '7':'F♯','♭2': 'A♭',   '♯2': 'A♯', '♭3': 'B♭',  '♯4': 'C♯', '♭5': 'D♭',   '♯5': 'D♯', '♭6': 'E♭', '♭7': 'F' },
                    'A♭': {'1':'A♭','2':'B♭','3':'C', '4':'D♭','5':'E♭','6':'F', '7':'G', '♭2': 'B𝄫',  '♯2': 'B', '♭3': 'C♭',  '♯4': 'D', '♭5': 'E𝄫',   '♯5': 'E', '♭6': 'F♭', '♭7': 'G♭'},
                    'A':  {'1':'A', '2':'B', '3':'C♯','4':'D', '5':'E', '6':'F♯','7':'G♯','♭2': 'B♭',   '♯2': 'B♯', '♭3': 'C',   '♯4': 'D♯', '♭5': 'E♭',   '♯5': 'E♯', '♭6': 'F', '♭7': 'G' },
                    'B♭': {'1':'B♭','2':'C', '3':'D', '4':'E♭','5':'F', '6':'G', '7':'A', '♭2': 'C♭',   '♯2': 'C♯', '♭3': 'D♭',  '♯4': 'E', '♭5': 'F♭',   '♯5': 'F♯', '♭6': 'G♭', '♭7': 'A♭'},
                    'B':  {'1':'B', '2':'C♯','3':'D♯','4':'E', '5':'F♯','6':'G♯','7':'A♯','♭2': 'C',    '♯2': 'C𝄪', '♭3': 'D',  '♯4': 'E♯', '♭5': 'F',    '♯5': 'F𝄪', '♭6': 'G', '♭7': 'A' }}

    tones = {'1': 0, '♭2': 1, '2': 2, '♯2': 3, '♭3': 3, '3': 4, '4': 5, '♯4': 6, '♭5': 6, '5': 7, '♯5': 8, '♭6': 8, '6': 9, '♭7': 10, '7': 11, '8': 0, '♭9': 1, '9': 2, '♯9':3 , '11': 5, '♯11':6, '13': 9, '𝄫7': 9};
    tonestable = [['1'], ['♭2'], ['2'] , ['♯2', '♭3'], ['3'] , ['4'] , ['♯4', '♭5'], ['5'] , ['♯5', '♭6'], ['6'] , ['♭7'], ['7']];
    inversions = ['0', '4', '7', '11'];
    //f_order is necessary since no order is guaranteed for objects with numerical keys (and map object is not supported by all browsers)
    f_order = ['', 'min', 'aug', 'dim', 'sus2', 'sus4', 'Δ7', 'min7', '7', '7sus', 'mΔ7', '7♯5', 'Δ7♭5', 'm7♭5', '7♭5', '7♯9', '7♭9', '6', 'min6', '5', 'Δ9', 'min9', '9', 'add9', '6/9', 'm6/9', 'm11', '11', 'Δ13', 'm13', '13'];
    formulas = {
        '':      '1 3 5',
        'min':   '1 ♭3 5',
        'aug':   '1 3 ♯5',
        'dim':   '1 ♭3 ♭5',
        'sus2':  '1 2 5',
        'sus4':  '1 4 5',
        'Δ7':    '1 3 5 7',
        'min7':  '1 ♭3 5 ♭7',
        '7':     '1 3 5 ♭7',
        '7sus':  '1 4 5 ♭7',
        'mΔ7':   '1 ♭3 5 7',
        '7♯5':   '1 3 ♯5 ♭7',
        'Δ7♭5':  '1 3 ♭5 7',
        'm7♭5':  '1 ♭3 ♭5 ♭7',
        'dim7':  '1 ♭3 ♭5 𝄫7',
        '7♭5':   '1 3 ♭5 ♭7',
        '7♯9':   '1 3 5 ♭7 ♯9',
        '7♭9':   '1 3 5 ♭7 ♭9',
        '6':  '1 3 5 6',
        'min6':  '1 ♭3 5 6',
        '5':     '1 5',
        'Δ9':    '1 3 5 7 9',
        'min9':  '1 ♭3 5 ♭7 9',
        '9':     '1 3 5 ♭7 9',
        'add9':  '1 3 5 9',
        '6/9':   '1 3 5 6 9',
        'm6/9':  '1 ♭3 5 6 9',
        'm11':   '1 ♭3 5 ♭7 9 11',
        '11':    '1 3 5 ♭7 9 11',
        'Δ13':   '1 3 5 7 9 13',
        'm13':   '1 ♭3 5 ♭7 9 11 13',
        '13':    '1 3 5 ♭7 9 11 13',
    };




    fretboard = ['4', '9', '2', '7', '11', '4'];
    chords = [
        /* mov **************************************************/
        // meter en orden E, G, A, C, D, E (según cuerda donde está root)
        { mov: 'E', form: '', fret: '0 2 2 1 0 0', fing: '1 3 4 2 1 1' },
        { mov: 'G', form: '', fret: '3 2 0 0 0 3', fing: '3 2 1 1 1 4' },
        { mov: 'A', form: '', fret: 'x 0 2 2 2 0', fing: 'x 1 2 3 4 1' },
        { mov: 'C', form: '', fret: 'x 3 2 0 1 0', fing: 'x 4 3 1 2 1' },
        { mov: 'D', form: '', fret: 'x x 0 2 3 2', fing: 'x x 1 2 3 4' },
        { mov: 'E', form: 'min', fret: '0 2 2 0 0 0', fing: '1 3 4 1 1 1' },
        { mov: 'A', form: 'min', fret: 'x 0 2 2 1 0', fing: 'x 1 3 4 2 1' },
        { mov: 'D', form: 'min', fret: 'x x 0 2 3 1', fing: 'x x 1 2 4 3' },
        { mov: 'E', form: '7', fret: '0 2 0 1 0 0', fing: '1 3 1 2 1 1' },
        { mov: 'A', form: '7', fret: 'x 0 2 0 2 0', fing: 'x 1 3 1 4 1' },
        {mov: "C", form: "7", fret: "x 3 2 3 1 x", fing: "x 3 2 4 1 x"},
        {mov: "D", form: "7", fret: "x x 0 2 1 2", fing: "x x 1 3 2 4"},
        { mov: 'E', form: 'min7', fret: '0 2 0 0 0 0', fing: '1 3 1 1 1 1' },
        { mov: 'E', form: 'min7', fret: '0 2 0 0 3 0', fing: '1 3 1 1 4 1' },
        {mov: "E", form: "min7", fret: "0 x 0 0 0 x", fing: "2 x 3 3 3 x"},
        { mov: 'A', form: 'min7', fret: 'x 0 2 0 1 0', fing: 'x 1 3 1 2 1' },
        {mov: "C", form: "min7", fret: "x 3 1 3 1 x", fing: "x 3 1 4 1 x"},
        {mov: "D", form: "min7", fret: "x x 0 2 1 1", fing: "x x 1 4 2 3"},
        { mov: 'E', form: 'sus4', fret: '0 2 2 2 0 0', fing: '1 2 3 4 1 1' },
        { mov: 'A', form: 'sus2', fret: 'x 0 2 2 0 0', fing: 'x 1 3 4 1 1' },
        { mov: 'E', form: '5', fret: '0 2 2 x x x', fing: '1 3 3 x x x' },
        { mov: 'E', form: '5', fret: '0 2 x x x x', fing: '1 3 x x x x' },
        { mov: 'A', form: '5', fret: 'x 0 2 x x x', fing: 'x 1 3 x x x' },
        { mov: 'A', form: '5', fret: 'x 0 2 2 x x', fing: 'x 1 3 3 x x' },
        { mov: 'E', form: "Δ7",  fret: "0 x 1 1 0 x", fing: "1 x 3 4 2 x"},
        { mov: 'A', form: "Δ7", fret: "x 0 2 1 2 0", fing: "x 1 3 2 4 1"},
        {mov: "C", form: "Δ7", fret: "x 3 2 0 0 3", fing: "x 3 2 1 1 4"},
        {mov: "D", form: "Δ7", fret: "x x 0 2 2 2", fing: "x x 1 3 3 3"},
        {mov: "F", form: "Δ7", fret: "x x 3 2 1 0", fing: "x x 4 3 2 1"},
        { mov: 'G', form: "9", fret: "3 x 3 2 0 x", fing: "3 x 4 2 1 x"},
        {mov: "E", form: "9", fret: "0 2 0 1 0 2", fing: "1 3 1 2 1 4"},
        {mov: "F", form: "9", fret: "1 0 1 0 1 x", fing: "2 1 3 1 4 x"},
        { mov: 'B♭',form: "9", fret: "x 1 0 1 1 1", fing: "x 2 1 3 3 3"},
        {mov: "B♭", form: "m7♭5", fret: "x 1 2 1 2 x", fing:"x 1 3 2 4 x"},
        {mov: "G", form: "m7♭5", fret: "3 x 3 3 2 x", fing: "2 x 3 4 1 x"},
        {mov: "G", form: "dim7", fret: "3 x 2 3 2 x", fing: "2 x 1 3 1 x"},
        {mov: "C", form: "dim7", fret: "x 3 4 2 4 x", fing: "x 2 3 1 4 x"},
        /* C ****************************************************/
        { key: '0', form: 'Δ7', fret: 'x 2 2 0 1 0', fing: '', inv: '3' },
        { key: "0", form: "Δ7", fret: "x 3 2 4 0 1", fing: "x 3 2 4 1 x"},
        { key: '0', form: 'maj6', fret: 'x 3 2 2 1 x', fing: '' },
        { key: '0', form: 'min6', fret: '8 x 7 8 8 x', fing: '' },
        {"key":"0","form":"add9","fret":"x 3 2 0 3 0","fing":" ","inv":"0"},
        /* D ****************************************************/
        { key: '2', form: 'min7', fret: 'x 3 x 2 3 1', fing: '', inv: '3' },
        { key: '2', form: 'maj6', fret: 'x x 0 2 0 2', fing: '' },
        /* E ****************************************************/
        { key: '4', form: 'maj6', fret: '0 2 2 1 2 0', fing: '' },
        { key: '4', form: 'min6', fret: '0 2 2 0 2 0', fing: '' },
        { key: '4', form: "min7", fret: "0 2 0 0 3 3", fing: "x 1 x x 3 4"},
        { key: '4', form: "min7", fret: "0 2 2 0 3 0", fing: "x 1 2 x 4 x"},
        { key: '4', form: 'Δ7', fret: '0 2 1 1 0 0', fing: '' },
        /* F ****************************************************/
        {"key":"5","form":"","fret":"x x 3 2 1 1","fing":" ","inv":"0"},
        /* G ****************************************************/
        {"key":"7","form":"min","fret":"x x 0 3 3 3","fing":" ","inv":"0"},
        { key: '7', form: '7', fret: '3 2 0 0 0 1', fing: '' },
        { key: '7', form: '7', fret: '3 2 0 0 3 1', fing: '' },
        { key: '7', form: '7', fret: 'x 2 0 0 0 1', fing: '', inv: '1' },
        { key: '7', form: '7', fret: 'x 2 0 0 3 1', fing: '', inv: '1' },
        {"key":"7","form":"add9","fret":"3 x 0 2 0 3","fing":" ","inv":"0"},
        /* A ****************************************************/
        { key: '9', form: 'maj6', fret: 'x 0 2 2 2 2', fing: 'x x 1 1 1 1' },
        { key: '9', form: 'sus4', fret: 'x 0 2 2 3 0', fing: '' },
        /* B ****************************************************/
        { key: '11', form: '7', fret: 'x 2 1 2 0 2', fing: '' },
        
        // {"key":"0","form":"min","fret":"x x 5 5 4 3","fing":" ","inv":"0"},
        // {"mov":"E","form":"min7","fret":"x x 1 1 1 1","fing":"x x 1 1 1 1","inv":"0"},
    ]

$(function(){
    if (window.location.pathname != '/' || window.location.pathname != '/index.html') {
        var currentPage = window.location.pathname.split(".")[0].split("/")[1]
        $('li#nav-' + currentPage).addClass('active');
        $('li#nav-' + currentPage).siblings().removeClass('active');
    }
    

    

});

    function getOrderedChords () {
        var chordresults = [];
        $.each(keytones, function(keyname, key) {
            $.each(f_order, function(ind, typename) {
                var results = $.grep(chords, function(e){ return e.form == typename && (e.key == key || typeof e.mov != 'undefined'); });
                var chordtyperesults = [];
                chordtyperesults = addChordsToKey(results, keyname);
                chordresults = chordresults.concat(chordtyperesults);
            });
        });
        return chordresults;
    }
    

    function isNumber(n) {
        return !isNaN(+n) && isFinite(n)
    }

    function addChordsToKey(pchords, keyname) {
        var chordresults = [];
        $.each(pchords, function(ind, result) {
            var chord = {};
            if (typeof keyname != 'undefined') {
                chord.key = keyname;
            } else {
                chord.key = result.mov;
            }
            chord.form = result.form;
            chord.fret = result.fret;
            chord.fing = result.fing;
            chord.inv = result.inv;
            if (typeof result.mov != 'undefined') {
                chord.mov = result.mov;
            }
            chordresults.push(chord);
        });
        return chordresults;
    }

// arreglar para usar func de arriba
    function addChordUrl  (id, chord, key) {
        arrchordsurl[id] = {};
        arrchordsurl[id].key = key;
        arrchordsurl[id].form = chord.form;
        arrchordsurl[id].fret = chord.fret;
        arrchordsurl[id].fing = chord.fing;
        arrchordsurl[id].inv = chord.inv;
        if (typeof chord.mov != 'undefined') {
            arrchordsurl[id].mov = chord.mov;
        }
    }

    function loadChords(results, chordsTagId = 'previewArea'){
        var extraData = {};
        var classMoveable = '';
        $.each(results, function(ind, result) {
            formula = formulas[result.form].split(/[ ,]+/);
            frets = result.fret.split(/[ ,]+/);
            fingers = result.fing.split(/[ ,]+/);
            
            if (chordsTagId == 'customChordsArea') {
                var mailInfo = {};
                mailInfo.key = keytones[result.key];
                mailInfo.form = result.form;
                mailInfo.fret = frets.join(' ');
                mailInfo.fing = fingers.join(' ');
                mailInfo.inv = result.inv;
                $('#customchord').val(JSON.stringify(mailInfo));
            }
            
            // if (typeof result === 'undefined' || ! result) {
            //     $('#previewArea').html('No chord available'); 
            //     return false;
            // }
            
            // moveable chords calc new frets and fings
            if (typeof result.mov != 'undefined') {
                var rootstr = '6';
                if (frets[0] == 'x') {
                    if (frets[1] == 'x') {
                        rootstr = '4';
                    } else {
                        if (frets[1] == 'x') {
                            rootstr = '3';
                        } else {
                            rootstr = '5';
                        }
                    }
                }
                
                if (keytones[result.key] - keytones[result.mov] < 0) {
                    var diff = keytones[result.key] - keytones[result.mov] + 12;
                } else {
                    var diff = keytones[result.key] - keytones[result.mov];
                }
                
                // sumamos +12 para mostrar los acordes movibles en su forma original (mov == 0) con "la barra"
                if (keytones[result.key] - keytones[result.mov] == 0 && chordsTagId == 'moveableChordsArea') {
                    var diff = (keytones[result.key] - keytones[result.mov] + 12)%12; // modulo para evitar que salgan acordes en el fret 13 y superior
                }
                 
                if (keytones[result.key] - keytones[result.mov] == 0 && chordsTagId == 'keyChordsArea') {
                    // si mostramos el acorde barrado en su forma abierta no mostraremos la posición de los dedos (que corresponde al barrado)
                    fingers = [];
                }
                
            $.each(frets, function( index, value ) {
                frets[index] = parseInt(value) + diff;
            });
            }

            // chord calc
            extraData.notes = [];
            extraData.tones = [];
            $.each(formula, function(index, value ) {
                tonesvalue = parseInt(tones[value])%12;
                extraData.tones[tonesvalue] = value;
                if (value == '9') { value = '2' }
                if (value == '11') { value = '4' }
                if (value == '13') { value = '6' }
                if (value == '♭9') { value = '♭2' }
                if (value == '♯9') { value = '♯2' }
                if (value == '♯11'){ value = '♯4' }
                extraData.notes.push(keyscale[result.key][value]);
            });
            

            // fret tones
            extraData.fretTones = [];
            $.each(frets, function( index, value ) {
                if (isNumber(value)) {
                    currentNote = (parseInt(fretboard[index])+parseInt(value,10))%12;
                    currentNote = (((parseInt(currentNote,10)-parseInt(keytones[result.key],10))%12)+12)%12;
                    extraData.fretTones.push(extraData.tones[currentNote]);
                } else {
                    extraData.fretTones.push('');
                }
            });

            // chart generation
            var title = '';
            var notesJoin = extraData.notes.join(' ');
            var tonesJoin = extraData.fretTones.join();
            var formulaJoin = formula.join();
            if (typeof result.inv != 'undefined' && result.inv != 0) {
                // change notes order
                if (typeof extraData.notes[result.inv] == 'undefined') {
                    extraData.notes[0] = '-'
                    invNote = '-'
                } else {
                    extraData.notes[0] = extraData.notes[result.inv];
                    invNote = extraData.notes[0];
                }
                extraData.notes[result.inv] = result.key;
                if (typeof extraData.notes[0] == 'undefined') {
                }
                notesJoin = extraData.notes.join(' ');
                title = result.key + result.form + '/' + invNote + ' (' + notesJoin + ')';
            } else {
                var title = result.key + result.form + ' (' + notesJoin + ')';
            }

            id = id + 1;
            
            var scale = 1.2;
            if (chordsTagId != 'previewArea') {
                scale = 1;
                var inversion = '<br /><strong>inv</strong>: root position (' + result.key + ')';
                if (result.inv == '1') {
                    inversion = '<br /><strong>inv</strong>: 1st inversion (' + invNote + ')';
                } else {
                    if (result.inv == '2') {
                        inversion = '<br /><strong>inv</strong>: 2nd inversion (' + invNote + ')';
                    } else {
                        if (result.inv == '3') {
                            inversion = '<br /><strong>inv</strong>: 3rd inversion (' + invNote + ')';
                        }
                    }
                }
                if (typeof result.mov != 'undefined') {
                    var moveable = '<strong>mov root: </strong>' + rootstr + 'th string<br /><strong>chord shape: </strong>' + result.mov + '<br />';
                } else {
                    var moveable = '<strong>moveable: no</strong><br />';
                }
                var details = moveable + '<strong>notes</strong>: ' + notesJoin + '<br /><strong>tones</strong>:' + formulaJoin + inversion;

                var buttonMoveable = '';
                if (chordsTagId == 'keyChordsArea' && typeof result.mov != 'undefined') {
                    buttonMoveable = '<div style="float:right;"><button type="button" data-chordkey="' + result.key + '" data-chordtype="' + result.form + '" class="btn btn-info btn-sm seemoveable">See moveable version</button></div>';
                    classMoveable = ' moveable ';
                }

                $('#' + chordsTagId).append('<div id="' + id + '" data-toggle="tooltip" data-html="true" title="' + details + '" class="chorddiv mytooltip ' + classMoveable + '"><svg id="previewChart' + id + '" ></svg>' + buttonMoveable + '</div>');
            } else {
                $('#' + chordsTagId).append('<div id="' + id + '" data-toggle="tooltip" title="Click to add to sheet" class="chorddiv mytooltip"><svg id="previewChart' + id + '" ></svg></div>');
            }
            $('[data-toggle="tooltip"]').tooltip()

            var placeholder = document.getElementById('previewChart' + id);

            var udi = {
                        title:title,
                        fret:frets.join(),
                        label:fingers.join(),
                        footer:tonesJoin,
                        // style: black,
                        scale:scale
                       };

            var createChart = chartMaker();
            
            createChart(placeholder,udi);
            
            addChordUrl(id, result, result.key);
            });
        
        
        
    }

    function loadCustomChord(fromLibrary = 'false') {
        // chord data
        var key=$('#select-key-custom').val();
        var type=$('#select-type-custom').val();
        var inv=$('#select-bass-note-custom').val();
        
        var arrfrets = [];
        $('.ifret').each(function() {
                arrfrets.push($(this).val());
        });
        
        var arrfings = [];
        $('.ifing').each(function() {
                arrfings.push($(this).val());
        });

        customChords = validateChord(key, type, inv, arrfrets, arrfings);

        console.log(customChords);
        if (fromLibrary == 'false') {
            $('#previewArea').html('');
            loadChords(customChords);
        } else {
            $('#customChordsArea').html('');
            loadChords(customChords, 'customChordsArea');
        }
        
    }
    
    function validateChord(key, type, inv, fret, fing) {
            var arrfrets = [];
            $.each(fret, function( index, value ) {
                if (isNumber(value) && value != '') {
                    arrfrets.push(value);
                } else {
                    arrfrets.push('x');
                }
            });
            
            var arrfings = [];
            $.each(fing, function( index, value ) {
                if (isNumber(value) && value != '') {
                    arrfings.push(value);
                } else {
                    arrfings.push('x');
                }
            });
            
        if (JSON.stringify(arrfings)==JSON.stringify(['x', 'x', 'x', 'x', 'x', 'x'])) {
            arrfings = [' ', ' ', ' ', ' ', ' ', ' ']
        }

        return [{ key: key, form: type, fret: arrfrets.join(), fing: arrfings.join(), inv: inv}];
    }
