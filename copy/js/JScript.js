function formValidator(name, obj) {
    var cc = 0;
    var val = "";
    $(":" + obj + "[name='" + name + "']").each(function() {
        if ($(this).attr("checked") == "checked") {
            cc = 1;
            val = $(this).val();
        }
    });
    if (cc == 1) {
        if (name == "rdioWho" && val == "其他") {
            if ($.trim($("#txtWho").val()) == "") {
                $("#" + name + "Tip").removeClass("onSuccess");
                $("#" + name + "Tip").addClass("onError");
                $("#txtWho").focus();
                return false;
            } else {
                $("#" + name + "Tip").removeClass("onError");
                $("#" + name + "Tip").addClass("onSuccess");
                return true;
            }

        } else {
            $("#" + name + "Tip").removeClass("onError");
            $("#" + name + "Tip").addClass("onSuccess");
            return true;
        }
    } else {

        $("#" + name + "Tip").removeClass("onSuccess");
        $("#" + name + "Tip").addClass("onError");
        $(":" + obj + "[name='" + name + "']").focus();
        return false;
    }
}

function provincecity(obj, name, type, pname) {
    var parentid = $(obj).val();
    if (parentid == "") {
        jQuery("#" + name).empty();
        if (type == "city") {
            jQuery("#" + name).append("<option value=\"\">所在城市</option>");
        } else {
            jQuery("#" + name).append("<option value=\"\">所在市区</option>");
        }
        jQuery("#" + name).change();
        return false;
    }
    if (pname != "0") {
        if ($("#" + pname).val() == "50" || $("#" + pname).val() == "16" || $("#" + pname).val() == "33" || $("#" + pname).val() == "33") {
            jQuery("#" + name).empty();
            jQuery("#" + name).append("<option value=\"\">——</option>");
            jQuery("#" + name).change();
            return false;
        }
    }
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/ajax/ajaxpublic.ashx?oper=" + type + "&vsttm=" + (new Date().getTime()),
        data: { cityid: parentid },
        error: function(XmlHttpRequest, textStatus, errorThrown) { alert(XmlHttpRequest.responseText); },
        success: function(d) {
            jQuery("#" + name).empty();
            jQuery("#" + name).append(d.returnval);
            jQuery("#" + name).change();
        }
    });
    return false;
}
