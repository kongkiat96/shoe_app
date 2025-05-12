const selectedTypeIDs = new Set();

// Filter logic
document.querySelectorAll('.filter-checkbox').forEach(cb => {
    selectedTypeIDs.add(cb.value);

    cb.addEventListener('change', () => {
        if (cb.checked) {
            selectedTypeIDs.add(cb.value);
        } else {
            selectedTypeIDs.delete(cb.value);
        }
        filterShoes();
    });
});

function filterShoes() {
    document.querySelectorAll('.shoe-card').forEach(card => {
        const typeID = card.getAttribute('data-type-id');
        card.style.display = selectedTypeIDs.has(typeID) ? '' : 'none';
    });
}

const btnClearFilter = document.getElementById('btnClearFilter');
let isCleared = false;

btnClearFilter.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.filter-checkbox');

    if (!isCleared) {
        // ล้างทั้งหมด
        selectedTypeIDs.clear();
        checkboxes.forEach(cb => cb.checked = false);
        btnClearFilter.innerHTML = '<i class="fa fa-search-plus"></i> เลือกทั้งหมด';
        btnClearFilter.classList.remove('btn-outline-warning');
        btnClearFilter.classList.add('btn-primary');
        isCleared = true;
    } else {
        // เลือกทั้งหมด
        checkboxes.forEach(cb => {
            cb.checked = true;
            selectedTypeIDs.add(cb.value);
        });
        btnClearFilter.innerHTML = '<i class="fa fa-search-minus"></i> ล้างที่เลือก';
        btnClearFilter.classList.remove('btn-primary');
        btnClearFilter.classList.add('btn-outline-warning');
        isCleared = false;
    }

    filterShoes();
});

// เพิ่มรายการที่ชอบ
document.querySelectorAll('.btn-fav').forEach(button => {
    button.addEventListener('click', () => {
        const shoeId = button.getAttribute('data-id');
        fetch('/favourite/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            body: JSON.stringify({ shoe_id: shoeId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        text: 'เพิ่มรายการสําเร็จ',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1800
                    })
                    loadFavourites();
                } else if (data.status === 23000) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'รายการนี้ถูกเพิ่มไปแล้ว',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2200
                    })
                }
            });
    });
});

// ผูกกับ container ที่ครอบปุ่มลบทั้งหมด เช่น id="favouriteContainer"
document.getElementById('favouriteContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-remove-fav')) {
        const shoeId = e.target.getAttribute('data-id');

        Swal.fire({
            text: "คุณแน่ใจว่าต้องการลบรายการที่ชอบนี้?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/favourite/remove`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                    },
                    body: JSON.stringify({ shoe_id: shoeId })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            text: 'ลบรายการที่ชอบแล้ว',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 1800
                        });
                        loadFavourites(); // โหลดข้อมูลใหม่แบบสด
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: 'เกิดข้อผิดพลาดในการลบรายการ',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 1800
                        });
                    }
                });
            }
        });
    }
});




function loadFavourites() {
    fetch('/favourite/list')
        .then(res => res.text())
        .then(html => {
            document.getElementById('favouriteContainer').innerHTML = html;
        })
        .catch(err => console.error('Failed to load favourites:', err));
}

function reTable()
{

}

$(document).ready(function () {
    $('#btnExportMe').click(function () {
        window.location.href = '/favourite/export/me';
    });

    $('#btnExportAll').click(function () {
        window.location.href = '/favourite/export/all';
    });
});
