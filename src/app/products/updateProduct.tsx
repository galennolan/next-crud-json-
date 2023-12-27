"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function UpdateProduct(product: Product) {
  // State lokal untuk menyimpan nilai judul, harga, status modal, dan status pengiriman data.
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  // Hook 'useRouter' dari Next.js untuk mendapatkan objek router.
  const router = useRouter();

  // Fungsi 'handleUpdate': Mengirimkan data produk yang diperbarui ke server saat formulir disubmit.
  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    // Menandai bahwa proses pengiriman data sedang berlangsung.
    setIsMutating(true);

    try {
      // Menggunakan fetch untuk mengirimkan data produk yang diperbarui ke server.
      await fetch(`http://localhost:5000/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
        }),
      });

      // Menandai bahwa proses pengiriman data telah selesai.
      setIsMutating(false);

      // Melakukan refresh router untuk memperbarui tampilan dan menutup modal.
      router.refresh();
      setModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  // Fungsi 'handleChange': Mengubah nilai status modal untuk membuka atau menutup modal.
  function handleChange() {
    setModal(!modal);
  }

  // Render komponen
  return (
    <div>
      {/* Tombol untuk membuka modal formulir pengeditan produk */}
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      {/* Input checkbox untuk mengontrol status modal */}
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {/* Modal formulir untuk mengedit produk */}
      <div className="modal">
        <div className="modal-box">
          {/* Judul modal */}
          <h3 className="font-bold text-lg">Edit {product.title}</h3>

          {/* Formulir untuk mengedit produk */}
          <form onSubmit={handleUpdate}>
            {/* Input untuk judul produk */}
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Product Name"
              />
            </div>

            {/* Input untuk harga produk */}
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>

            {/* Tombol-tombol untuk menutup modal atau mengirim formulir */}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              {/* Menampilkan tombol "Update" atau indikator "Updating..." tergantung pada status pengiriman data */}
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
