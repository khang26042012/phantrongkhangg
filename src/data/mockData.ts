// Mock data cho portfolio "Galaxy Mysterious"
// Cảm giác huyền bí, vũ trụ, sáng tạo

export const personal = {
  name: "Ngọc Anh",
  title: "Creative Developer & 3D Artist",
  tagline: "Từ những vì sao đến dòng code",
  bio: "Tôi bắt đầu như một ánh sao lạc lõng — lang thang giữa các hệ thiên hà số, thu thập mọi tinh túy về ánh sáng, vật liệu và chuyển động. Mỗi dự án là một hành trình khám phá, nơi code gặp nghệ thuật và cả hai cùng tiến hóa. Tôi tin vào sức mạnh của sự tĩnh lặng — của một khoảng đen sâu thẳm chứa vô vàn hạt sáng.",
  bio2: "Làm việc độc lập từ 2022, tôi đã triển khai hơn 30 trải nghiệm web 3D for các thương hiệu và nghệ sĩ quốc tế. Công cụ chính: Three.js, WebGL, GLSL, Blender. Phong cách: monochrome, sâu thẳm, có điểm nhấn vàng.",
  email: "ngocanh@galaxy.dev",
  location: "Hà Nội — làm việc toàn cầu",
  availability: "Đang nhận dự án Q4 2026",
  socials: {
    github: "github.com/ngocanh",
    twitter: "twitter.com/ngocanh_dev",
    linkedin: "linkedin.com/in/ngocanh",
    portfolio: "ngocanh.galaxy",
  },
};

export const skills = [
  { name: "Three.js", level: 95, icon: "orbit", category: "3D" },
  { name: "React Three Fiber", level: 90, icon: "react", category: "3D" },
  { name: "WebGL / GLSL", level: 88, icon: "shader", category: "3D" },
  { name: "Blender", level: 85, icon: "cube", category: "3D" },
  { name: "GSAP + ScrollTrigger", level: 92, icon: "motion", category: "Motion" },
  { name: "Lenis Smooth Scroll", level: 88, icon: "scroll", category: "Motion" },
  { name: "React & Next.js", level: 90, icon: "atom", category: "Web" },
  { name: "TypeScript", level: 92, icon: "code", category: "Web" },
  { name: "WebGPU (experimental)", level: 60, icon: "bolt", category: "Future" },
  { name: "Post-processing", level: 87, icon: "glow", category: "3D" },
];

export const projects = [
  {
    id: "nebula-archive",
    title: "Nebula Archive",
    year: "2026",
    description: "Trải nghiệm web 3D tương tác cho một bộ sưu tập nghệ thuật số — người xem bay qua 12 nebula, mỗi nebula là một tác phẩm.",
    tags: ["Three.js", "WebGL", "GLSL", "Next.js"],
    client: "Studio Aurora",
    link: "#",
    accent: "gold" as const,
  },
  {
    id: "silence",
    title: "SILENCE / Im lặng",
    year: "2025",
    description: "Nghệ thuật trình diễn số cho nghệ sĩ piano — màn hình phản chiếu giai điệu thành particle vũ trụ theo thời gian thực.",
    tags: ["React Three Fiber", "Web Audio", "GSAP"],
    client: "Solo artist",
    link: "#",
    accent: "mono" as const,
  },
  {
    id: "black-market",
    title: "Black Market",
    year: "2025",
    description: "Website thương mại điện tử cho thương hiệu thời trang underground — monochrome, tối giản, hiệu ứng hover tinh tế.",
    tags: ["Next.js", "Tailwind", "GSAP", "Lenis"],
    client: "B.M. Studio",
    link: "#",
    accent: "mono" as const,
  },
  {
    id: "constellation",
    title: "Constellation",
    year: "2024",
    description: "Portfolio cá nhân của một nhạc sĩ electronica — camera bay qua các vì sao biểu tượng các bản hit.",
    tags: ["Three.js", "ScrollTrigger", "WebGL"],
    client: "Personal",
    link: "#",
    accent: "gold" as const,
  },
  {
    id: "void-catalog",
    title: "Void Catalog",
    year: "2024",
    description: "Catalogue số cho bộ sưu tập NFT vũ trụ — 216 tác phẩm được render procedural và trình bày trong không gian 3D.",
    tags: ["Three.js", "WebGL", "Procedural"],
    client: "Void Labs",
    link: "#",
    accent: "mono" as const,
  },
];

export const experience = [
  {
    period: "2026 — Hiện tại",
    role: "Independent Creative Developer",
    company: "Self-employed",
    description: "Làm việc độc lập cho các studio và nghệ sĩ quốc tế. Chuyên sâu về 3D web và trải nghiệm immersive.",
  },
  {
    period: "2024 — 2026",
    role: "Senior 3D Developer",
    company: "Studio Aurora",
    description: "Dẫn dắt team 4 developer, triển khai 8 dự án 3D web đoạt giải Awwwards.",
  },
  {
    period: "2022 — 2024",
    role: "Frontend & Motion Developer",
    company: "Nomad Labs",
    description: "Tương tác với GSAP, Three.js. Triển khai 20+ landing page animation.",
  },
  {
    period: "2021 — 2022",
    role: "Junior Developer",
    company: "Studio Vẽ",
    description: "Học nghề: React, GSAP, cơ bản về WebGL.",
  },
];

export const stats = [
  { value: "30+", label: "Dự án 3D web" },
  { value: "12", label: "Giải thưởng quốc tế" },
  { value: "5yr", label: "Kinh nghiệm" },
  { value: "40+", label: "Khách hàng toàn cầu" },
];
