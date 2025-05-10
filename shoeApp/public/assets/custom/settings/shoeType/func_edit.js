$(document).ready(function () {
    $("#saveEditShoeType").on("click", function (e) {
        e.preventDefault();
        removeValidationFeedback();
        const form = $("#formEditShoeType")[0];
        const shoeTypeID = $('#shoeTypeID').val();
        const fv = setupFormValidationShoeType(form);
        const formData = new FormData(form);

        fv.validate().then(function (status) {
            if (status === 'Valid') {
                postFormData("edit-shoe-type/" + shoeTypeID, formData)
                    .done(onSaveEditShoeTypeSuccess)
                    .fail(handleAjaxSaveError);
            }
        });
    });
});

function onSaveEditShoeTypeSuccess(response) {
    handleAjaxEditResponse(response);
    closeAndResetModal("#editShoeTypeModal", "#formEditShoeType");
}
