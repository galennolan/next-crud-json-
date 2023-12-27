"use client";

// Menggunakan hook 'useState' dari React untuk mengelola state lokal
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

// Komponen 'AddProduct': Menampilkan tombol untuk menambahkan produk baru dengan modal.
export const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  // State lokal 'modal' untuk mengontrol tampilan/modal
  const [modal, setModal] = useState(false);

  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    // Menandai bahwa proses pengiriman data sedang berlangsung.
    setIsMutating(true);

    try {
      await fetch("http://localhost:5000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
        }),
      });

      // Reset form values after successful submission
      setTitle("");
      setPrice("");

      // Refresh router to update the view
      router.refresh();
      setModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      // Regardless of success or failure, reset the loading state
      setIsMutating(false);
    }
  }
  // Fungsi 'handleChange': Mengubah nilai 'modal' untuk membuka atau menutup modal.
  function handleChange() {
    setModal(!modal);
  }

  // Render komponen
  return (
    <div>
      {/* Tombol untuk membuka modal */}
      <button className="btn" onClick={handleChange}>
        Add New Product
      </button>

      {/* Input checkbox untuk mengontrol status modal */}
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {/* Modal untuk menambahkan produk baru */}
      <div className="modal">
        <div className="modal-box">
          {/* Judul modal */}
          <h3 className="font-bold text-lg">Add New Product</h3>

          {/* Form untuk menambahkan produk */}
          <form onSubmit={handleSubmit}>
            {/* Input untuk judul produk */}
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} //simpen value title
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
                onChange={(e) => setPrice(e.target.value)} //simpen value price
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>

            {/* Tombol-tombol untuk menutup modal atau mengirim formulir */}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              {/* Menampilkan tombol "Save" atau indikator "Saving..." tergantung pada status pengiriman data */}
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
