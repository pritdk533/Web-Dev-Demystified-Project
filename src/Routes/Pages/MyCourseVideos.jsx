import { SUPABASE_API_KEY, BASE_URL } from "../../../constants";
import axios from "axios";
import { getUser } from "../../Utils/getUser";
import { useLoaderData } from "react-router-dom";
import styles from "./MyCourseVideos.module.css";
import ReactPlayer from "react-player/vimeo";
import { useEffect, useState } from "react";

export async function myCourseVideosLoader({ params }) {
  const { course_id } = params;
  const { access_token } = await getUser();

  const { data } = await axios.get(
    `${BASE_URL}/rest/v1/modules?course_id=eq.${course_id}&select=*`,
    {
      headers: { apikey: SUPABASE_API_KEY },
    }
  );
  const modules = data.sort((a, b) => a.number - b.number);
  const videos = await Promise.all(
    modules.map((module) => {
      return axios.get(
        `${BASE_URL}/rest/v1/videos?module_id=eq.${module.id}&select=*`,
        {
          headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    })
  );

  const moduleVideos = videos.map((item) =>
    item.data.sort((a, b) => a.number - b.number)
  );

  const videosData = moduleVideos.map((videos, index) => {
    return { module_name: modules[index].name, videos };
  });

  return videosData;
}

function MyCourseVideos() {
  const videosData = useLoaderData();
  if (videosData.length === 0) {
    return <h1>No videos found</h1>;
  }

  let firstVideo;
  for (let module of videosData) {
    if (module.videos.length > 0) {
      firstVideo = module.videos[0].vimeo_url;
      break;
    }
  }

  if (!firstVideo) {
    return <h1>No videos found</h1>;
  }

  const [videoUrl, setVideoUrl] = useState(firstVideo);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className={`${styles.myCourseSection}`}>
      <div className={styles.playlist}>
        {videosData.map((module, index) => (
          <div key={index}>
            <h3>{module.module_name}</h3>
            <ul>
              {module.videos.map((video, index) => (
                <li
                  key={video.number}
                  onClick={() => setVideoUrl(video.vimeo_url)}
                >
                  {index + 1}. {video.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.videoContainer}>
        <ReactPlayer
          url={videoUrl}
          className={styles.video}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default MyCourseVideos;
