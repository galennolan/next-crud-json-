"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(product: Product) {
  // State lokal untuk mengontrol status modal dan status pengiriman data.
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  // Hook 'useRouter' dari Next.js untuk mendapatkan objek router.
  const router = useRouter();

  // Fungsi 'handleDelete': Menghapus produk dari server saat tombol "Delete" ditekan.
  async function handleDelete(productId: number) {
    // Menandai bahwa proses penghapusan data sedang berlangsung.
    setIsMutating(true);

    // Menggunakan fetch untuk menghapus produk dari server.
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });

    // Menandai bahwa proses penghapusan data telah selesai.
    setIsMutating(false);

    // Melakukan refresh router untuk memperbarui tampilan dan menutup modal.
    router.refresh();
    setModal(false);
  }

  // Fungsi 'handleChange': Mengubah nilai status modal untuk membuka atau menutup modal.
  function handleChange() {
    setModal(!modal);
  }

  // Render komponen
  return (
    <div>
      {/* Tombol untuk membuka modal konfirmasi penghapusan produk */}
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      {/* Input checkbox untuk mengontrol status modal */}
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {/* Modal konfirmasi untuk menghapus produk */}
      <div className="modal">
        <div className="modal-box">
          {/* Pesan konfirmasi di dalam modal */}
          <h3 className="font-bold text-lg">
            Are you sure to delete {product.title}?
          </h3>

          {/* Tombol-tombol untuk menutup modal atau menghapus produk */}
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>

            {/* Menampilkan tombol "Delete" atau indikator "Deleting..." tergantung pada status pengiriman data */}
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
