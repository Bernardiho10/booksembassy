import { useEffect } from "react";

export default function usePageScroll() {
  useEffect(() => {
    const toggleSidebar = () => {
      document.body.classList.toggle("sidebar-toggled");
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("toggled");

      if (sidebar.classList.contains("toggled")) {
        const collapseEls = sidebar.querySelectorAll(".collapse");
        collapseEls.forEach((collapse) => {
          collapse.classList.remove("show");
        });
      }
    };

    const closeSidebarOnResize = () => {
      if (window.innerWidth < 768) {
        const collapseEls = document.querySelectorAll(".sidebar .collapse");
        collapseEls.forEach((collapse) => {
          collapse.classList.remove("show");
        });
      }
      if (
        window.innerWidth < 480 &&
        !document.querySelector(".sidebar").classList.contains("toggled")
      ) {
        document.body.classList.add("sidebar-toggled");
        document.querySelector(".sidebar").classList.add("toggled");
        const collapseEls = document.querySelectorAll(".sidebar .collapse");
        collapseEls.forEach((collapse) => {
          collapse.classList.remove("show");
        });
      }
    };

    const preventSidebarScroll = (event) => {
      if (window.innerWidth > 768) {
        event.preventDefault();
        sidebar.scrollTop += event.deltaY;
      }
    };

    const handleScrollToTop = () => {
      if (window.pageYOffset > 100) {
        document.querySelector(".scroll-to-top").classList.add("show");
      } else {
        document.querySelector(".scroll-to-top").classList.remove("show");
      }
    };

    const smoothScroll = (event) => {
      event.preventDefault();
      document.scrollingElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Toggle sidebar
    const sidebarToggle = document.querySelector("#sidebarToggle");
    sidebarToggle.addEventListener("click", toggleSidebar);

    // Close sidebar on resize
    window.addEventListener("resize", closeSidebarOnResize);

    // Prevent sidebar scroll
    const sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("wheel", preventSidebarScroll);

    // Scroll to top
    window.addEventListener("scroll", handleScrollToTop);

    // Smooth scroll
    const scrollTopBtn = document.querySelector(".scroll-to-top");
    scrollTopBtn.addEventListener("click", smoothScroll);

    return () => {
      // Cleanup
      sidebarToggle.removeEventListener("click", toggleSidebar);
      window.removeEventListener("resize", closeSidebarOnResize);
      sidebar.removeEventListener("wheel", preventSidebarScroll);
      window.removeEventListener("scroll", handleScrollToTop);
      scrollTopBtn.removeEventListener("click", smoothScroll);
    };
  }, []);
}
