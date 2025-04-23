// import styles from './shoppingCard.module.css';

import Title from "components/title/title";
import ProfileEditForm from "./profileEditForm";

export default function ProfileEditPage() {
  return (
    <div className="pagecontent">
      <Title title={"Edit client information"} icon={"/editProfile.svg"}></Title>
      <ProfileEditForm />
    </div>
  );
};
