import linkedinImg from "../../assets/images/linkedin.png";
import githubImg from "../../assets/images/git.png";
import igorImg from "../../assets/images/profile_igor.png";
import nildoImg from "../../assets/images/profile_nildo.png";
import rafaelImg from "../../assets/images/profile_rafael.png";
import viniImg from "../../assets/images/profile_vinicius.png";
import { useModal } from "../../providers/modal";
import { ModalContactsContainer } from "./styles";
import { IoClose } from "react-icons/io5";

const ModalContacts = () => {
  const { handleCloseContactsModal } = useModal();

  return (
    <ModalContactsContainer
      onClick={handleCloseContactsModal}
      id="ModalContactsContainer"
    >
      <div id="contactModal">
        <IoClose />
        <div id="profileDiv">
          <div className="devProfile">
            <img src={igorImg} alt="Igor" />
            <h2>Igor Matheus</h2>
            <div className="devSocial">
              <a
                href="https://www.linkedin.com/in/igormgg/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinImg} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/igormgg"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubImg} alt="Github" />
              </a>
            </div>
          </div>
          <div className="devProfile">
            <img src={nildoImg} alt="Igor" />
            <h2>Nill Junior</h2>
            <div className="devSocial">
              <a
                href="https://www.linkedin.com/in/nill-junior/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinImg} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/nilljr"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubImg} alt="Github" />
              </a>
            </div>
          </div>
          <div className="devProfile">
            <img src={rafaelImg} alt="Igor" />
            <h2>Rafael Schug</h2>
            <div className="devSocial">
              <a
                href="https://www.linkedin.com/in/rafael-schug/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinImg} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/RafaelSchug"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubImg} alt="Github" />
              </a>
            </div>
          </div>
          <div className="devProfile">
            <img src={viniImg} alt="Igor" />
            <h2>Vinícius Freitas</h2>
            <div className="devSocial">
              <a
                href="https://www.linkedin.com/in/vinicius-de-freitas/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinImg} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/Vinicius2m"
                target="_blank"
                rel="noreferrer"
              >
                <img src={githubImg} alt="Github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ModalContactsContainer>
  );
};

export default ModalContacts;
