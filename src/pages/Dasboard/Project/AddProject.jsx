import React, { useEffect, useRef } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $, { event } from "jquery";

function AddProject() {

  const [siteUrl, setSiteUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputText, setinputText] = useState("");
  const inputRef = useRef(null);
  const [text, setText] = useState("Type Here...");
  const divRef = useRef(null);
  const [fetchDivs, setFetchDivs] = useState(["Item 1", "Item 2"]);

  const fetchSitemap = async () => {
    if (!siteUrl.trim()) {
      setError("Please enter a URL.");
      return;
    }
    setError("");
    setIsLoading(true);
    let sitemapUrl = siteUrl.includes(".xml") ? siteUrl : siteUrl.endsWith("/") ? `${siteUrl}sitemap_index.xml` : `${siteUrl}/sitemap_index.xml`;
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
      setTags([...tags, inputText.trim()]);
      setinputText("");
      inputRef.current.innerText = "";
    }
    else if (e.key === "Backspace" && !inputText && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  const handleInput = () => {
    setText(divRef.current.innerText);
  }
  const removeFetchDiv = (index) => {
    setUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  }
  return (
    <>
      <h3 className='mt-3 ms-2'>Add New Project</h3>
      <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
        <form className='w-100'>
          <div>
            <label for="formGroupExampleInput" class="form-label">Project Name</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter project name" />
          </div>
          <div>
            <label for="formGroupExampleInput2" class="form-label">Project URL</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter project url" />
          </div>
          <div>
            <label for="formGroupExampleInput2" class="form-label">Fetch Pages From Sitemap URL</label>
            <div className='d-flex fetch-page'>
              <input type="text" class="form-control" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="Enter sitemap url" aria-label="Recipient's username" aria-describedby="button-addon2" />
              <button class="btn fetch-btn" type="button" id="button-addon2" onClick={fetchSitemap}>Fetch Pages</button>
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
            <label for="formGroupExampleInput2" class="form-label">Anchor Text</label>
            <div className='border p-2 typeTag'>
              {tags.map((tag, index) => (
                <span className='tagName' key={index} contentEditable={false} onClick={() => removeTag(index)}>{tag} <RxCross2 className='cross' /></span>
              ))}
              <div className='typeInput' ref={inputRef} contentEditable suppressContentEditableWarning onInput={(e) => setinputText(e.currentTarget.innerText)} onKeyDown={handleKeyDown}>

              </div>
            </div>
          </div>
          <div className='text-center'>
            <button className='btn dashboard-btn px-4 py-2'>Add Projects</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProject
