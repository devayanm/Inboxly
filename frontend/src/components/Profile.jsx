import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../App.jsx'; // Import the theme hook
import { useNavigate } from 'react-router-dom';

function Profile() {
	const { isDark } = useTheme(); // Use centralized theme
	const navigate = useNavigate(); // For navigation
	
	const emptyProfile = {
		fullName: '',
		headline: '',
		about: '',
		location: '',
		email: '',
		website: '',
		avatarUrl: '',
		bannerUrl: '',
	};

	const [savedProfile, setSavedProfile] = useState(emptyProfile);
	const [draftProfile, setDraftProfile] = useState(emptyProfile);
	const [showSavedToast, setShowSavedToast] = useState(false);

	const bannerInputRef = useRef(null);
	const avatarInputRef = useRef(null);

	useEffect(() => {
		try {
			const storedV2 = localStorage.getItem('userProfileV2');
			if (storedV2) {
				const parsed = JSON.parse(storedV2);
				setSavedProfile({ ...emptyProfile, ...parsed });
				setDraftProfile({ ...emptyProfile, ...parsed });
				return;
			}
			// Back-compat with previous keys if present
			const legacy = JSON.parse(localStorage.getItem('userProfile') || '{}');
			const migrated = {
				fullName: legacy.fullName || '',
				headline: '',
				about: legacy.bioText || '',
				location: '',
				email: legacy.emailAddress || '',
				website: '',
				avatarUrl: legacy.profileImageUrl || '',
				bannerUrl: legacy.bannerImageUrl || '',
			};
			setSavedProfile({ ...emptyProfile, ...migrated });
			setDraftProfile({ ...emptyProfile, ...migrated });
		} catch (_error) {
			/* ignore parse errors */
		}
	}, []);

	const hasAnyData = useMemo(() => {
		const d = draftProfile;
		return Boolean(
			d.fullName || d.headline || d.about || d.location || d.email || d.website || d.avatarUrl || d.bannerUrl
		);
	}, [draftProfile]);

	function handleAvatarFileChange(event) {
		const selectedFile = event.target.files && event.target.files[0];
		if (!selectedFile) return;
		const objectUrl = URL.createObjectURL(selectedFile);
		setDraftProfile(prev => ({ ...prev, avatarUrl: objectUrl }));
	}

	function handleBannerFileChange(event) {
		const selectedFile = event.target.files && event.target.files[0];
		if (!selectedFile) return;
		const objectUrl = URL.createObjectURL(selectedFile);
		setDraftProfile(prev => ({ ...prev, bannerUrl: objectUrl }));
	}

	function handleSave(event) {
		event.preventDefault();
		setSavedProfile(draftProfile);
		localStorage.setItem('userProfileV2', JSON.stringify(draftProfile));
		setShowSavedToast(true);
		setTimeout(() => setShowSavedToast(false), 1500);
	}

	function handleCancel() {
		setDraftProfile(savedProfile);
	}

	function handleReset() {
		setDraftProfile(emptyProfile);
	}

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 }
		}
	};

	const listVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { staggerChildren: 0.06, delayChildren: 0.1 }
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
	};

  return (
		<div className={(isDark ? "bg-[#000000] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#14213D]") + " min-h-screen w-full p-0"}>
			{/* Back to Home button */}
			<motion.button
				onClick={() => navigate('/')}
				className={(isDark ? "bg-[#14213D] text-[#FFFFFF]" : "bg-[#E5E5E5] text-[#14213D]") + " fixed top-4 left-4 z-10 flex items-center gap-2 rounded-lg px-4 py-2 shadow-md hover:brightness-110"}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
				</svg>
				Back to Home
			</motion.button>
			<motion.div
				className={(isDark ? "bg-[#14213D]" : "bg-[#E5E5E5]") + " w-full rounded-none shadow-none ring-0 overflow-hidden"}
				variants={containerVariants}
				initial="hidden"
				animate="show"
			>
				{/* Banner area */}
				<div className="relative h-44 sm:h-56 md:h-64 cursor-pointer group" onClick={() => bannerInputRef.current && bannerInputRef.current.click()}>
					{draftProfile.bannerUrl ? (
						<img src={draftProfile.bannerUrl} alt="Banner" className="absolute inset-0 h-full w-full object-cover" />
					) : (
						<div className={"absolute inset-0 " + (isDark ? "bg-[#FCA311]" : "bg-[#14213D]")} />
					)}
					<div className={(isDark ? "bg-black/30" : "bg-black/20") + " absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"}>Click to upload banner</div>
					<input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerFileChange} />

					{/* Delete banner button when image present */}
					{draftProfile.bannerUrl && (
						<button
							onClick={(e) => { e.stopPropagation(); setDraftProfile(prev => ({ ...prev, bannerUrl: '' })); }}
							className="absolute top-3 right-3 bg-white/90 text-black text-xs rounded-full px-2 py-1 shadow hover:bg-white"
						>
							Delete banner
						</button>
					)}

					{/* Avatar overlapping lower edge */}
					<motion.div
						className="absolute left-6 bottom-0 translate-y-1/2"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.35 }}
					>
						<div
							onClick={(e) => {
								e.stopPropagation();
								if (avatarInputRef.current) avatarInputRef.current.click();
							}}
							className={(isDark ? "ring-[#14213D] bg-[#000000]" : "ring-white bg-white") + " w-28 h-28 md:w-32 md:h-32 rounded-full ring-4 overflow-hidden shadow-2xl cursor-pointer group/avatar relative"}
						>
							{draftProfile.avatarUrl ? (
								<img src={draftProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
							) : (
								<div className={(isDark ? "text-slate-300" : "text-[#14213D]") + " w-full h-full flex items-center justify-center text-sm"}>Upload photo</div>
							)}
							<div className={(isDark ? "bg-black/30" : "bg-black/20") + " absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-xs"}>Change photo</div>
							{draftProfile.avatarUrl && (
								<button
									onClick={(e) => { e.stopPropagation(); setDraftProfile(prev => ({ ...prev, avatarUrl: '' })); }}
									className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-black text-xs rounded-full px-2 py-0.5 shadow hover:bg-white"
								>
									Delete photo
								</button>
							)}
						</div>
						<input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFileChange} />
					</motion.div>
				</div>

				<div className="px-6 pb-6 pt-16">{/* padding top for avatar overlap */}

					<motion.form
						className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
						variants={listVariants}
						initial="hidden"
						animate="show"
						onSubmit={handleSave}
					>
						<motion.div variants={itemVariants} className="col-span-1">
							<label className={(isDark ? "text-[#E5E5E5]" : "text-[#14213D]") + " block text-xs font-medium uppercase tracking-wide"}>Full name</label>
							<input
								type="text"
								value={draftProfile.fullName}
								onChange={(e) => setDraftProfile(prev => ({ ...prev, fullName: e.target.value }))}
								placeholder="Alex Johnson"
								className={(isDark ? "border-[#E5E5E5]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#E5E5E5]/70" : "border-[#14213D]/20 bg-white text-[#14213D] placeholder:text-[#14213D]/50") + " mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCA311]"}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="col-span-1">
							<label className={(isDark ? "text-[#E5E5E5]" : "text-[#14213D]") + " block text-xs font-medium uppercase tracking-wide"}>Headline</label>
							<input
								type="text"
								value={draftProfile.headline}
								onChange={(e) => setDraftProfile(prev => ({ ...prev, headline: e.target.value }))}
								placeholder="Senior Software Engineer"
								className={(isDark ? "border-[#E5E5E5]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#E5E5E5]/70" : "border-[#14213D]/20 bg-white text-[#14213D] placeholder:text-[#14213D]/50") + " mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCA311]"}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
							<label className={(isDark ? "text-[#E5E5E5]" : "text-[#14213D]") + " block text-xs font-medium uppercase tracking-wide"}>About</label>
							<input
								type="text"
								value={draftProfile.about}
								onChange={(e) => setDraftProfile(prev => ({ ...prev, about: e.target.value }))}
								placeholder="Short summary about you..."
								className={(isDark ? "border-[#E5E5E5]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#E5E5E5]/70" : "border-[#14213D]/20 bg-white text-[#14213D] placeholder:text-[#14213D]/50") + " mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCA311]"}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="col-span-1">
							<label className={(isDark ? "text-[#E5E5E5]" : "text-[#14213D]") + " block text-xs font-medium uppercase tracking-wide"}>Location</label>
							<input
								type="text"
								value={draftProfile.location}
								onChange={(e) => setDraftProfile(prev => ({ ...prev, location: e.target.value }))}
								placeholder="San Francisco, CA"
								className={(isDark ? "border-[#E5E5E5]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#E5E5E5]/70" : "border-[#14213D]/20 bg-white text-[#14213D] placeholder:text-[#14213D]/50") + " mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCA311]"}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="col-span-1">
							<label className={(isDark ? "text-[#E5E5E5]" : "text-[#14213D]") + " block text-xs font-medium uppercase tracking-wide"}>Email</label>
							<input
								type="email"
								value={draftProfile.email}
								onChange={(e) => setDraftProfile(prev => ({ ...prev, email: e.target.value }))}
								placeholder="alex@example.com"
								className={(isDark ? "border-[#E5E5E5]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#E5E5E5]/70" : "border-[#14213D]/20 bg-white text-[#14213D] placeholder:text-[#14213D]/50") + " mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCA311]"}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="col-span-1">
							<label className={(isDark ? "text-[#E5E5E5]" : "text-[#14213D]") + " block text-xs font-medium uppercase tracking-wide"}>Website</label>
							<input
								type="url"
								value={draftProfile.website}
								onChange={(e) => setDraftProfile(prev => ({ ...prev, website: e.target.value }))}
								placeholder="https://your-site.com"
								className={(isDark ? "border-[#E5E5E5]/20 bg-[#000000] text-[#FFFFFF] placeholder:text-[#E5E5E5]/70" : "border-[#14213D]/20 bg-white text-[#14213D] placeholder:text-[#14213D]/50") + " mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCA311]"}
							/>
						</motion.div>


						{/* Upload helpers (hidden inputs already above). Keep space for consistency on small screens */}

						<motion.div variants={itemVariants} className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-4">
							<motion.button
								type="button"
								onClick={handleCancel}
								className="rounded-lg border border-[#E5E5E5]/20 bg-rose-500 px-4 py-2 text-[#FFFFFF] hover:bg-[#14213D]/50"
								whileTap={{ scale: 0.98 }}
							>
								Cancel
							</motion.button>
							<motion.button
								type="submit"
								className="rounded-lg bg-[#FCA311] px-5 py-2 font-semibold text-[#000000] shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
								whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(79,70,229,0.35)' }}
								whileTap={{ scale: 0.98 }}
							>
								Save changes
							</motion.button>
							<motion.button
								type="button"
								onClick={handleReset}
								className="rounded-lg bg-[#14213D] px-5 py-2 font-semibold text-[#FFFFFF]/90 shadow-sm hover:bg-[#14213D]/90"
								whileTap={{ scale: 0.98 }}
							>
								Reset
							</motion.button>
						</motion.div>
					</motion.form>
				</div>
			</motion.div>

			<AnimatePresence>
				{showSavedToast && (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 20, opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FCA311] text-[#000000] px-4 py-2 shadow-lg"
					>
						Profile saved
					</motion.div>
				)}
			</AnimatePresence>
    </div>
  );
}

export default Profile;