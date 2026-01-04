import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiType, FiFileText, FiSend, FiX, FiCheckCircle, FiGrid } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../AuthContext/AuthContext";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Productivity"); // Default category
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  // Your requested categories
  const categories = ["Productivity", "Study Tips", "Community", "Tech", "Success Stories"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return Swal.fire("Error", "Please upload a cover image first!", "error");
    }

    setIsUploading(true);

    try {
      // 1. Upload image to imgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const img_hosting_api = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(img_hosting_api, formData);

      if (imgRes.data.success) {
        // 2. Prepare the blog data object with Category and Date
        const blogData = {
          authorName: user?.displayName,
          authorEmail: user?.email,
          title,
          description,
          category, // Sending the selected category
          image: imgRes.data.data.display_url,
          createdAt: new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
        };

        const response = await axiosInstance.post("/new-blogs", blogData);
        
        if (response.data.insertedId) {
          Swal.fire({
            title: "Article Published!",
            text: `Your post in "${category}" is now live.`,
            icon: "success",
            confirmButtonColor: "#22c55e",
          });

          // Reset Form
          setTitle("");
          setDescription("");
          setCategory("Productivity");
          removeImage();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire("Error", error.message || "Failed to post blog", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] text-neutral-content ">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-primary mb-2">Create Blog</h1>
          <p className="text-gray-400 font-medium">Select a category and share your insights with the community.</p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" bg-base-100 p-8 rounded-2xl border border-white/5 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* --- TITLE INPUT --- */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold mb-3 text-neutral">
                  <FiType className="text-primary" /> Blog Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter a catchy title..."
                  className="w-full bg-secondary text-neutral border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all font-medium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* --- CATEGORY DROPDOWN --- */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold mb-3 text-neutral">
                  <FiGrid className="text-primary" /> Select Category
                </label>
                <select
                  required
                  className="w-full bg-secondary text-neutral border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all  font-medium appearance-none cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="text-neutral bg-secondary py-2">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* --- IMAGE UPLOAD --- */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-3 text-neutral">
                <FiUploadCloud className="text-primary" /> Cover Image
              </label>

              {!imagePreview ? (
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="h-25 border-2 border-dashed border-white/10 group-hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center bg-secondary text-neutral transition-all duration-300">
                    <FiUploadCloud className="text-xl group-hover:scale-110 group-hover:text-primary mb-3 text-gray-500 transition-all" />
                    <p className="text-sm text-gray-400 font-medium">Click to upload high-quality cover</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-64 bg-black group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold transition-all"
                    >
                      <FiX /> Replace Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- CONTENT AREA --- */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-3 text-neutral">
                <FiFileText className="text-primary" /> Blog Content
              </label>
              <textarea
                required
                rows="8"
                placeholder="Share your expertise with the world..."
                className="w-full bg-secondary text-neutral  border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all resize-none font-medium leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* --- SUBMIT BUTTON --- */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full font-black py-3 hover:bg-accent rounded-4xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] text-sm uppercase tracking-wider ${
                isUploading
                  ? "bg-white/5 cursor-not-allowed text-gray-500"
                  : "bg-primary hover:bg-neutral text-base-100 shadow-[0_10px_30px_rgba(var(--p),0.2)]"
              }`}
            >
              {isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Uploading to {category}...
                </>
              ) : (
                <>
                  <FiSend /> Publish to {category}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;