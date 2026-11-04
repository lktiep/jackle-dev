export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} Jack Le (Tiep Le)</span>
        <span>Next.js · GSAP · no trackers</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
