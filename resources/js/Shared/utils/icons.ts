import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faCog,
  faIndustry,
  faBook,
  faPencilAlt,
  faBookmark,
  faCube,
  faSync,
  faFolder,
  faLink,
  faShareAlt,
  faGlobe,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faGithub,
  faYoutube,
  faLinkedin,
  faMedium,
  faTwitter,
  faTiktok,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';

const solidIcons = [
  faHome,
  faCog,
  faIndustry,
  faBook,
  faPencilAlt,
  faBookmark,
  faCube,
  faSync,
  faFolder,
  faLink,
  faShareAlt,
  faGlobe,
  faSun,
  faMoon,
];

const brandIcons = [faInstagram, faGithub, faYoutube, faLinkedin, faMedium, faTwitter, faTiktok, faPinterest];

export const initializeIcons = () => {
  library.add(...solidIcons, ...brandIcons);
};
