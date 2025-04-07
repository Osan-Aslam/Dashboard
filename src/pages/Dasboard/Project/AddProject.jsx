import React, { useEffect, useRef } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $, { event } from "jquery";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProject() {

  const [sitemapURL, setsitemapURL] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [anchorTags, setanchorTags] = useState([]);
  const [inputText, setinputText] = useState("");
  const inputRef = useRef(null);
  const [text, setText] = useState("Type Here...");
  const divRef = useRef(null);
  const [fetchDivs, setFetchDivs] = useState(["Item 1", "Item 2"]);
  const [projectUrl, setProjectUrl] = useState("");
  const [projectName, setprojectName] = useState("");
  const navigate = useNavigate();


  const fetchSitemap = async () => {
    if (!sitemapURL.trim()) {
      setError("Please enter a URL.");
      return;
    }
    setError("");
    setIsLoading(true);
    let sitemapUrl = sitemapURL.includes(".xml") ? sitemapURL : sitemapURL.endsWith("/") ? `${sitemapURL}sitemap_index.xml` : `${sitemapURL}/sitemap_index.xml`;
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

    try {
      let response = await fetch(proxyUrl + sitemapUrl);
      if (!response.ok) throw new Error("Sitemap not found or URL is incorrect.");

      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const sitemapElements = xml.querySelectorAll("sitemap > loc");
      let allpageUrls = [];

      if (sitemapElements.length > 0) {
        const sitemapUrls = Array.from(sitemapElements).map(el => el.textContent);

        for (let sitemap of sitemapUrls) {
          let subResponse = await fetch(proxyUrl + sitemap);
          if (!subResponse.ok) continue;

          let subText = await subResponse.text();
          let subXml = parser.parseFromString(subText, "application/xml");
          let locElements = subXml.querySelectorAll("url > loc");
          let pageUrls = Array.from(locElements).map(el => el.textContent);
          allpageUrls = [...allpageUrls, ...pageUrls];
        }
        setUrls(allpageUrls);
      }
      else {
        const locElements = xml.querySelectorAll("url > loc");
        const extractedUrls = Array.from(locElements).map((el) => el.textContent);
        setUrls(extractedUrls);
      }

    } catch (error) {
      setError(error.message);
      setUrls([]);
    } finally {
      setIsLoading(false);
    }

  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      e.preventDefault();
      setanchorTags([...anchorTags, inputText.trim()]);
      setinputText("");
      inputRef.current.innerText = "";
    }
    else if (e.key === "Backspace" && !inputText && anchorTags.length) {
      setanchorTags(anchorTags.slice(0, -1));
    }
  };
  const removeTag = (index) => {
    setanchorTags(anchorTags.filter((_, i) => i !== index));
  };
  const handleInput = () => {
    setText(divRef.current.innerText);
  }
  const removeFetchDiv = (index) => {
    setUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!projectName || !projectUrl || !sitemapURL || anchorTags.length === 0) {
      setError("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("ProjectName", projectName);
    formData.append("ProjectURL", projectUrl);
    formData.append("SitemapURL", sitemapURL);
    formData.append("AnchorTags", JSON.stringify(anchorTags));

    // console.log("Sending data:", Object.fromEntries(formData.entries()));

    try{
      const response = await axios.post(`http://207.180.203.98:5030/api/projects`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "accept": "*/*"
        }
      });
      console.log("Success:", response.data);
      navigate("/project");
      alert("Project added successfully!");
    } catch(error) {
      console.error("Error adding project:", error);
      setError("Something went wrong while adding the project.");
    }
  }

  return (
    <>
      <h3 className='mt-3 ms-2'>Add New Project</h3>
      <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
        <form className='w-100' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="formGroupExampleInput" className="form-label">Project Name</label>
            <input type="text" className="form-control" onChange={(e) => setprojectName(e.target.value)} id="formGroupExampleInput" placeholder="Enter project name" />
          </div>
          <div>
            <label htmlFor="formGroupExampleInput2" className="form-label">Project URL</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" onChange={(e) => setProjectUrl(e.target.value)} placeholder="Enter project url" />
          </div>
          <div>
            <label htmlFor="formGroupExampleInput2" className="form-label">Fetch Pages From Sitemap URL</label>
            <div className='d-flex fetch-page'>
              <input type="text" className="form-control" value={sitemapURL} onChange={(e) => setsitemapURL(e.target.value)} placeholder="Enter sitemap url" aria-label="Recipient's username" aria-describedby="button-addon2" />
              <button className="btn fetch-btn" type="button" id="button-addon2" onClick={fetchSitemap}>Fetch Pages</button>
            </div>
          </div>
          <div className='fetchPages p-2 mt-3'>
            <label htmlFor="FetchedPages">Fetched Pages</label>
            <div className=' form-label'>
              {isLoading ? (
                <div className="spinner-border text-primary" role="status"></div>
              ) : (
                urls.length > 0 ? (
                  urls.map((url, index) => (
                    <div key={index} className='fetchDiv'>
                      <div className='col-5 d-flex justify-content-between align-items-start page-url'>
                        <a href={url}>{url}</a>
                        <RxCross2 onClick={() => removeFetchDiv(index)} className='cross' />
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
                )
              )}
            </div>
          </div>
          <div>
            <label htmlFor="formGroupExampleInput2" className="form-label">Anchor Text</label>
            <div className='border p-2 typeTag'>
              {anchorTags.map((tag, index) => (
                <span className='tagName' key={index} contentEditable={false} onClick={() => removeTag(index)}>{tag} <RxCross2 className='cross' /></span>
              ))}
              <div className='typeInput' ref={inputRef} contentEditable suppressContentEditableWarning onInput={(e) => setinputText(e.currentTarget.innerText)} onKeyDown={handleKeyDown}>

              </div>
            </div>
          </div>
          <div className='text-center'>
            <button className='btn dashboard-btn px-4 py-2' type='submit'>Add Projects</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProject
