$(document).ready(function () {
    $("#saveEditShoe").on("click", function (e) {
        e.preventDefault();
        removeValidationFeedback();
        const form = $("#formEditShoe")[0];
        const shoeID = $('#shoeID').val();
        const fv = setupFormValidationShoe(form);
        const formData = new FormData(form);

        fv.validate().then(function (status) {
            if (status === 'Valid') {
                postFormData("edit-shoe/" + shoeID, formData)
                    .done(onSaveEditShoeSuccess)
                    .fail(handleAjaxSaveError);
            }
        });
    });
});

function onSaveEditShoeSuccess(response) {
    handleAjaxEditResponse(response);
    closeAndResetModal("#editShoeModal", "#formEditShoe");
}
