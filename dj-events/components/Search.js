import styles from "../styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
const Search = () => {
  const router = useRouter();
  const [term, termUpdate] = useState("");

  function submittor(event) {
    console.log(term);
    router.push(`http://localhost:3000/events/search?term=${term}`);
    event.preventDefault();
  }

  return (
    <div className={styles.searchMain}>
      <form onSubmit={submittor}>
        <input
          type='text'
          placeholder='Search Events'
          value={term}
          onChange={(ev) => {
            termUpdate(ev.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Search;
