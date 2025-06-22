// import { useState } from 'react';

// export default function UserModal({ user = {}, onClose, onSubmit, isEdit }) {
//   const [form, setForm] = useState({
//     name: user.name || '',
//     email: user.email || '',
//     role: user.role || 'customer',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEdit) {
//       onSubmit({ ...user, ...form });
//     } else {
//       onSubmit(form);
//     }
//   };

//   return (
//     <div className="modal">
//       <form onSubmit={handleSubmit} className="modal-content">
//         <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
//         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
//         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
//         <select name="role" value={form.role} onChange={handleChange}>
//           <option value="customer">Customer</option>
//           <option value="official">Official</option>
//           <option value="Admin">Admin</option>
//         </select>
//         {!isEdit && (
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />
//         )}
//         <div style={{ marginTop: '1rem' }}>
//           <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
//           <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
