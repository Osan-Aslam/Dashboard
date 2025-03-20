import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import $, { event } from "jquery";

function Sidebar() {
  $(document).ready(function() {
    $(".nav-link").click(function() {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    });
  });
  return (
    <>
      <div class="nav flex-column nav-pills pt-4">
        <Link to="/dashboard" className={"nav-link active"}>Dashboard</Link>
        <Link to="/backlink" className="nav-link">Backlinks</Link>
        <Link to="/project" className="nav-link">Our Projects</Link>
        <Link to="/team" className="nav-link">Team</Link>
        <Link to="/" className="nav-link logout d-none d-lg-block"><IoIosLogOut /> Logout</Link>
      </div>
    </>
  )
}

export default Sidebar
