$(document).ready(function () {
    $("#saveAddShoeType").on("click", function (e) {
        e.preventDefault();
        removeValidationFeedback();
        const form = $("#formAddShoeType")[0];
        const fv = setupFormValidationShoeType(form);
        const formData = new FormData(form);

        fv.validate().then(function (status) {
            if (status === 'Valid') {
                postFormData("save-shoe-type", formData)
                    .done(onSaveShoeTypeSuccess)
                    .fail(handleAjaxSaveError);
            }
        });
    });
});

function onSaveShoeTypeSuccess(response) {
    handleAjaxSaveResponse(response);
    closeAndResetModal("#addShoeTypeModal", "#formAddShoeType");
}
