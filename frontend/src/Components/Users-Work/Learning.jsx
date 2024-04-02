import React, { useEffect, useState } from 'react';
import { YoutubeOutlined } from '@ant-design/icons';

const Learning = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader"></div>
      </div>

    )
  }

  const learningPlatforms = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', playlistURL: 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&feature=shared' },
        { name: 'CSS', playlistURL: 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&feature=shared' },
        { name: 'JavaScript', playlistURL: 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&feature=shared' },
        { name: 'React', playlistURL: 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&feature=shared' },
        { name: 'Vue.js', playlistURL: 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&feature=shared' },
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'Express.js', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'Spring Boot', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'Django', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'Flask', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'Ruby on Rails', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'ASP.NET', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'GraphQL', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' },
        { name: 'RESTful APIs', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5JAqVvThNylHYNWLYMtUV' }
      ]
    },
    {
      category: 'Data Science',
      skills: [
        { name: 'Python', playlistURL: 'https://youtube.com/playlist?list=PLQVvvaa0QuDfSfqQuee6K8opKtZsh7sA9' },
        { name: 'R', playlistURL: 'https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
        { name: 'Machine Learning', playlistURL: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
        { name: 'Data Visualization', playlistURL: 'https://youtube.com/playlist?list=PLZunrMqOrluGluLHIh8ux4D0GkTJcv5yC' },
        { name: 'Big Data', playlistURL: 'https://youtube.com/playlist?list=PLfNsYXAA9Ucs7G1NpHdDqFMZBLdPf2fpB' },
        { name: 'SQL', playlistURL: 'https://youtube.com/playlist?list=PL4cUxeGkcC9gP2onazU5-0aXF8mOOxJ05' },
        { name: 'Pandas', playlistURL: 'https://youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y' },
        { name: 'NumPy', playlistURL: 'https://youtube.com/playlist?list=PLQVvvaa0QuDc2QjQOkZ4rtLYZVll_sZFZ' },
        { name: 'Scikit-learn', playlistURL: 'https://youtube.com/playlist?list=PLQVvvaa0QuDfKTOs3Keq_kaG2P55YRn5v' }
      ]
    },
    {
      category: 'Mobile Development',
      skills: [
        { name: 'Android', playlistURL: 'https://youtube.com/playlist?list=PL6gx4Cwl9DGBlmzzFcLgDhKTTfNLfX1IK' },
        { name: 'iOS', playlistURL: 'https://youtube.com/playlist?list=PLoN_ejT35AEhFJJ_pUnsC0p21skDS6TK9' },
        { name: 'React Native', playlistURL: 'https://youtube.com/playlist?list=PLoN_ejT35AEgfbIQcP5g_MNnDlcb0xtJb' },
        { name: 'Swift', playlistURL: 'https://youtube.com/playlist?list=PLMRqhzcHGw1ZqzYnpIuQAn2rcjhOtbqGX' },
        { name: 'Kotlin', playlistURL: 'https://youtube.com/playlist?list=PLsyeobzWxl7occs4rPvqX9J22kcqBsUwV' },
        { name: 'Flutter', playlistURL: 'https://youtube.com/playlist?list=PLhXZp00uXBk4np17N39WvB80zgxlZfVjt' },
        { name: 'Xamarin', playlistURL: 'https://youtube.com/playlist?list=PLPt6Qy5ZLtvGfWOSa7UYhTQzAnQPxD9H0' },
        { name: 'Mobile UI Design', playlistURL: 'https://youtube.com/playlist?list=PL_gG0V_zRUpf1xQpck4Rz8CJ9wWB6_-m5' },
        { name: 'Firebase', playlistURL: 'https://youtube.com/playlist?list=PLl-K7zZEsYLkPZHe41m4jfAxUi0JjLgSM' }
      ]
    },
    {
      category: 'Cloud Computing',
      skills: [
        { name: 'AWS', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L8jNdER96XdXjYjZeyzacnP' },
        { name: 'Azure', playlistURL: 'https://youtube.com/playlist?list=PL6n9fhu94yhXQS_p1i-HLIftB9Y7Vnxlo' },
        { name: 'Google Cloud Platform', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L_5jAbE1khRkRCp9tds0FTr' },
        { name: 'DevOps', playlistURL: 'https://youtube.com/playlist?list=PL9ooVrP1hQOFP9H8Y15DVGCA6GavhgJ8a' },
        { name: 'Docker', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L-4NVS4NzqH0j9kVqUaurxV' },
        { name: 'Kubernetes', playlistURL: 'https://youtube.com/playlist?list=PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi' },
        { name: 'Serverless Computing', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L97LhK1rtPr7COf04fF9a9d' },
        { name: 'Cloud Security', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L8LDu3qscyESbGf9Isl0LP4' },
        { name: 'Infrastructure as Code', playlistURL: 'https://youtube.com/playlist?list=PLhW3qG5bs-L-oT0GenwPLcJAPD_SiFKFu' }
      ]
    },
    {
      category: 'Cybersecurity',
      skills: [
        { name: 'Ethical Hacking', playlistURL: 'https://www.youtube.com/playlist?list=PL6gx4Cwl9DGDV6SnbINlVUd0o2xT4JbMu' },
        { name: 'Penetration Testing', playlistURL: 'https://www.youtube.com/playlist?list=PL6gx4Cwl9DGDgp7nGSUnnXihbTLFZJ79B' },
        { name: 'Cryptography', playlistURL: 'https://www.youtube.com/playlist?list=PLhQjrBD2T3813udnhXFTwflQbcs4BtXI7' },
        { name: 'Security Analysis', playlistURL: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnmpdmX7RoTOyuNJQAb-r-gd' },
        { name: 'Cybersecurity Frameworks', playlistURL: 'https://www.youtube.com/playlist?list=PLJcaPjxegjBVcqW9zQQG3QS2GOtHcXuIz' },
        { name: 'Incident Response', playlistURL: 'https://www.youtube.com/playlist?list=PL32tHXi4UaEShNp5-KZCVKC6qoEdLS-4o' },
        { name: 'Malware Analysis', playlistURL: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnmpdmX7RoTOyuNJQAb-r-gd' }
      ]
    },
    {
      category: 'UI/UX Design',
      skills: [
        { name: 'Wireframing', playlistURL: 'https://www.youtube.com/playlist?list=PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB' },
        { name: 'Prototyping', playlistURL: 'https://www.youtube.com/playlist?list=PL6gx4Cwl9DGDgp7nGSUnnXihbTLFZJ79B' },
        { name: 'User Research', playlistURL: 'https://www.youtube.com/playlist?list=PLVcJ_a_iMmN1Efi4LGW6fDCDneC_cWoMV' },
        { name: 'UI Design Principles', playlistURL: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gFxvsd0yuXgpfcg5XApUub' },
        { name: 'Adobe XD', playlistURL: 'https://www.youtube.com/playlist?list=PLDyQo7g0_nsX8_gZAB8KD1lL4j4halQBJ' },
        { name: 'Sketch', playlistURL: 'https://www.youtube.com/playlist?list=PLG8eYkT6UjY3TXSu4jXLG_6cKkn5TjG0S' },
        { name: 'Figma', playlistURL: 'https://www.youtube.com/playlist?list=PLXDU_eVOJTx6VB7zd0f3b94vnmFgJbXki' },
        { name: 'Responsive Design', playlistURL: 'https://www.youtube.com/playlist?list=PLgGbWId6zgaXFR4SW_3qJ55cxmEqRNIzx' }
      ]
    },
    {
      category: 'Project Management',
      skills: [
        { name: 'Agile Methodology', playlistURL: 'https://www.youtube.com/playlist?list=PLrw5Z3Kzp3Mg0rnw0qhK5L9iBx-xB0bBO' },
        { name: 'Scrum', playlistURL: 'https://www.youtube.com/playlist?list=PLDQaRcbiSnqF5U8ffMgZzS7fq1rHUI3Q8' },
        { name: 'Kanban', playlistURL: 'https://www.youtube.com/playlist?list=PLqAa8Qf7kmz2em2buC0SbtvYFzY2bRIML' },
        { name: 'Project Planning', playlistURL: 'https://www.youtube.com/playlist?list=PLKvXdnxovC64c2CS33e0p7-8dW_xvuxLA' },
        { name: 'Risk Management', playlistURL: 'https://www.youtube.com/playlist?list=PLowqqAkat6yNIYXd7sM7Erfh8V-GC_u4_' },
        { name: 'Stakeholder Management', playlistURL: 'https://www.youtube.com/playlist?list=PLJIoFc1xdEBM9kDeRWpG79g_J1MxFl5Pw' },
        { name: 'Agile Tools', playlistURL: 'https://www.youtube.com/playlist?list=PL1BNSjM6RZBrp9R_Xr5A5MRjRzBiHJNMa' },
        { name: 'Lean Methodology', playlistURL: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNM_Y-bUAhblSAdWRnmBUcr' }
      ]
    }
  ];

  return (
    <div className="learning-container">
      <h1 className="learning-header">Learning Platforms</h1>
      {learningPlatforms.map((category, index) => (
        <div key={index} className="learning-category">
          <h2 className="learning-category-header">{category.category}</h2>
          <div className="learning-skill-list">
            {category.skills.map((skill, idx) => (
              <div key={idx} className="learning-skill">
                <span>{skill.name}</span>
                <a href={skill.playlistURL} target="_blank" rel="noopener noreferrer">
                  <YoutubeOutlined />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Learning;
