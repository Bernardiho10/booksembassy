import "./css/sb-admin-2.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import $ from "jquery";
import "./components/SidebarNavigation";
import SidebarNavigation from "./components/SidebarNavigation";
import AdminContentWrapper from "./components/AdminContentWrapper";
import Tables from "./components/Tables";
import { useEffect } from "react";
import usePageScroll from "./hooks/usePageScroll";

function App() {
  usePageScroll();
  return (
    <div>
      <div id="wrapper">
        {/* SITE COMPONENT */}
        <SidebarNavigation />
        <AdminContentWrapper>
          <Tables />
        </AdminContentWrapper>
      </div>

      {/* <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      {/* <!-- Logout Modal--> */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        tab
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <a className="btn btn-primary" href="login.html">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add School */}
      <a href="#" class="btn btn-primary btn-lg fixed-button">
        <i class="fas fa-plus"></i>
      </a>
    </div>
  );
}

export default App;
