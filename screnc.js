var sen = "C:\\Program Files (x86)\\Windows Script Encoder\\screnc.exe";   //screnc.exe�̃p�X
var param = WScript.arguments;
var wss = new ActiveXObject("wscript.shell");
var files = [];
if (param.count()) {
    for (var f = 0; f < param.count(); f++) { files.push(param(f)); }
} else {
    var doc = new ActiveXObject("htmlfile");
    var cb = doc.parentWindow.clipboardData.getData("text");
    if (wss.popup("�ȉ��̃t�@�C����ϊ����܂����H\n\n" + cb, 0, "�m�F", 1) == 1) {
        var ff = cb.split(/\r\n|\n/);
        for (f in ff) { files.push(ff[f]); }
    } else {
        doc = null;
        wss = null;
        WScript.quit();
    }
    doc = null;
}
var sfo = new ActiveXObject("scripting.filesystemobject");
var cd, ex, bn, cn;
for (var i in files) {
    cd = sfo.getparentfoldername(files[i]);
    ex = sfo.getextensionname(files[i]).toLowerCase();
    bn = sfo.getbasename(files[i]);
    if (sfo.fileexists(files[i]) == 0) {
        wss.popup("�t�@�C����������܂���", 0, "�m�F");
        break;
    }
    try {
        var fp = files[i];
        switch (ex) {
            case "hta":
                chgn(files[i], bn + ".html");
                encode(build(bn + ".html"), fp);
                wss.popup("����", 0, "�m�F"); break;
            case "vbs":
                cn = bn + ".vbe";
                encode(fp, build(cn));
            case "js":
                cn = bn + ".jse";
                encode(fp, build(cn));
            case "wsf":
                cn = bn + ".Enc.wsf";
                encode(fp, build(cn), true);
        }
    } catch (e) {
        wss.popup(e.description, 0, "�G���[");
    }
}
sfo = null;
wss = null;
WScript.quit();
function build(fname) { return sfo.buildpath(cd, fname); }
function chgn(fpath, newname) { sfo.getfile(fpath).name = newname; }
function encode(ep, cp, isWsf) { wss.run("\"" + sen + "\" " + (isWsf ? "/e sct " : "") + "\"" + ep + "\" \"" + cp + "\"", 0, true); }
