import { createApp } from 'vue'
import App from './App.vue'
import './style.css';  // นำเข้าไฟล์ CSS

// ✅ Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'; 

// ✅ Import Animate.css
import 'animate.css';

// ✅ Import GSAP
import { gsap } from 'gsap';

// ✅ Import AOS (Animate On Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';  // CSS ของ AOS

// ✅ Start AOS
AOS.init();

createApp(App).mount('#app');
