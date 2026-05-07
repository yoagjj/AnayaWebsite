import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X, Check, Search, Package } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    size: '',
    material: '',
    image: '',
    category: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchProducts();
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus produk ini?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        description: '',
        size: '',
        material: '',
        image: 'https://picsum.photos/seed/' + Math.random() + '/800/1000',
        category: 'Bouquet'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-brand-brown">Admin Dashboard</h1>
            <p className="text-brand-brown/40 font-light mt-1 uppercase tracking-widest text-xs">Manage Anaya Collection</p>
          </div>
          
          <button 
            onClick={() => openModal()}
            className="inline-flex items-center space-x-2 bg-brand-brown text-white py-4 px-8 rounded-full text-sm uppercase tracking-widest hover:bg-brand-sage transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Stats & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           <div className="bg-white p-8 rounded-3xl shadow-sm flex items-center space-x-6 border border-brand-brown/5">
              <div className="p-4 bg-brand-pink/20 rounded-2xl text-brand-brown">
                 <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-brown/40 font-medium">Total Items</p>
                <p className="text-2xl font-serif text-brand-brown">{products.length}</p>
              </div>
           </div>
           
           <div className="md:col-span-2 bg-white p-4 rounded-3xl shadow-sm border border-brand-brown/5 flex items-center px-8">
              <Search className="w-5 h-5 text-brand-brown/20 mr-4" />
              <input 
                type="text" 
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-brand-brown placeholder:text-brand-brown/20 font-light"
              />
           </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-brand-brown/5">
          {loading ? (
             <div className="p-32 flex justify-center">
                <div className="w-6 h-6 border-2 border-brand-brown/10 border-t-brand-brown rounded-full animate-spin" />
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-neutral-50 text-brand-brown/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-8 py-6">Product</th>
                    <th className="px-8 py-6">Category</th>
                    <th className="px-8 py-6">Price</th>
                    <th className="px-8 py-6">Material</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-brown/5">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={product.image} className="w-12 h-16 object-cover rounded-lg bg-neutral-100" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-sm font-medium text-brand-brown">{product.name}</p>
                            <p className="text-xs text-brand-brown/40 font-light truncate max-w-[200px]">{product.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="px-3 py-1 bg-brand-pink/20 text-brand-brown rounded-full text-[10px] uppercase tracking-widest font-semibold">
                            {product.category || 'Legacy'}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-brand-brown/60 font-sans">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-8 py-6 text-sm text-brand-brown/60 font-light italic">
                        {product.material}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <button onClick={() => openModal(product)} className="p-2 text-brand-brown/40 hover:text-brand-sage hover:bg-brand-sage/10 rounded-lg transition-all">
                              <Edit2 className="w-4 h-4" />
                           </button>
                           <button onClick={() => handleDelete(product.id)} className="p-2 text-brand-brown/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-16 text-center text-brand-brown/20 italic font-serif">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-brand-brown/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-6 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-[3rem] z-[70] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center px-10 py-8 border-b border-brand-brown/5">
                <h3 className="text-2xl font-serif text-brand-brown">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Price (IDR)</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage"
                    >
                      <option value="Bouquet">Bouquet</option>
                      <option value="Mini">Mini</option>
                      <option value="Single Flower">Single Flower</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Size Info</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 30cm x 20cm"
                      value={formData.size}
                      onChange={e => setFormData({...formData, size: e.target.value})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Material</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Milk Cotton Yarn"
                      value={formData.material}
                      onChange={e => setFormData({...formData, material: e.target.value})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage" 
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Description</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage" 
                    ></textarea>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/40">Image URL</label>
                    <input 
                      type="text" 
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-neutral-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-1 focus:ring-brand-sage" 
                    />
                  </div>
                </div>
              </form>

              <div className="px-10 py-8 border-t border-brand-brown/5 flex justify-end space-x-4">
                 <button onClick={closeModal} className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold text-brand-brown/40 hover:text-brand-brown transition-colors">Cancel</button>
                 <button 
                  onClick={(e) => handleSubmit(e as any)}
                  className="px-10 py-4 bg-brand-brown text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-brand-sage transition-all shadow-xl shadow-brand-brown/10 flex items-center space-x-2"
                >
                   <Check className="w-4 h-4" />
                   <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
