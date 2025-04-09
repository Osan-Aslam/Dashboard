import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMember() {
  const { id } = useParams();
  const [projectName, setprojectName] = useState("");
  const [projectURL, setprojectURL] = useState("");
  const [sitemapURL, setsitemapURL] = useState("");
  const [anchorTags, setanchorTags] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [inputText, setinputText] = useState("");
  const inputRef = useRef(null);

  const [loadingProject, setLoadingProject] = useState(true);


  useEffect(() => {
    const response = axios.get(`http://207.180.203.98:5030/api/projects/${id}`, {
      headers: {
        'Accept': '*/*',
      }
    }).then(response => {
      const project = response.data;

      setprojectName(project.projectName);
      setprojectURL(project.projectURL);
      setsitemapURL(project.sitemapURL || '');
      let parsedTags = [];
      try {
        if (typeof project.anchorTags === "string") {
          if (project.anchorTags.startsWith("[")) {
            parsedTags = JSON.parse(project.anchorTags); // Proper JSON string
          } else {
            parsedTags = project.anchorTags.split(','); // Comma-separated string
          }
        } else {
          parsedTags = project.anchorTags;
        }
      } catch (err) {
        console.error("Failed to parse anchorTags: ", err);
        parsedTags = [];
      }
      setanchorTags(parsedTags || []);
      setLoadingProject(false);
    }).catch(error => {
      console.error("Error fetching project:", error);
    });
  }, [id]);

  useEffect(() => {
    if (sitemapURL) {
      fetchSitemapPages(sitemapURL);
    }
  }, [sitemapURL]);

  const fetchSitemapPages = async (sitemapURL) => {
    try {

      const response = await axios.get(`http://207.180.203.98:5030/api/projects/pages/${sitemapURL}`, {
        headers: {
          "Accept": "*/*",
        }
      });
      const locUrls = response.data.urls.map(item => item.loc);
      setUrls(locUrls);
    } catch (error) {
      console.error("Error while fetching Sitemap", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProjectName", projectName);
    formData.append("ProjectURL", projectURL);
    formData.append("SitemapURL", sitemapURL);
    anchorTags.forEach(tag => {
      formData.append("AnchorTags", tag);
    })

    axios.patch(`http://207.180.203.98:5030/api/projects/${id}`, formData, {
      headers: {
        "Accept": "*/*",
        "Content-Type": "multipart/form-data",
      }
    }).then(response => {
      console.log("Project Update Succesfully: ", response.data);
      navigate("/project");
    }).catch(error => {
      console.error("Failed to update project:", error);
    })
    console.log('Form Submitted');
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
  return (
    <>
      <h3 className='mt-3 ms-2'>Update Project</h3>
      <div className='col-lg-8 mx-auto mt-4 add-project p-4'>
        {
          loadingProject ? (
            <p></p>
          ) : (
            <form className='w-100' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="formGroupExampleInput" className="form-label">Project Name</label>
                <input type="text" className="form-control" value={projectName} onChange={(e) => setprojectName(e.target.value)} id="formGroupExampleInput" placeholder="Enter project name" />
              </div>
              <div>
                <label htmlFor="formGroupExampleInput2" className="form-label">Project URL</label>
                <input type="text" className="form-control" value={projectURL} id="formGroupExampleInput2" onChange={(e) => setprojectURL(e.target.value)} placeholder="Enter project url" />
              </div>
              <div>
                <label htmlFor="formGroupExampleInput2" className="form-label">Fetch Pages From Sitemap URL</label>
                <div className='d-flex fetch-page'>
                  <input type="text" className="form-control" value={sitemapURL} onChange={(e) => setsitemapURL(e.target.value)} placeholder="Enter sitemap url" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <button className="btn fetch-btn" type="button" id="button-addon2">Fetch Pages</button>
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
                            <RxCross2 className='cross' />
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
                  <div className='typeInput' ref={inputRef} contentEditable suppressContentEditableWarning onInput={(e) => setinputText(e.currentTarget.innerText)} onKeyDown={handleKeyDown}></div>
                </div>
              </div>
              <div className='text-center'>
                <button className='btn dashboard-btn px-4 py-2' type='submit'>Update Projects</button>
              </div>
            </form>
          )
        }
      </div>
    </>
  )
}

export default UpdateMember
