import { getMovie, getMovies } from "../../services/movieService";
import { useRouter } from "next/router";

export default ({ movie }) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <h1>Loading ... </h1>;
  }
  return (
    <div>
      <h1>{movie.name}</h1>
      <p>英文名：{movie.ename}</p>
    </div>
  );
};

export async function getStaticProps({ params }) {
  console.log("Run getStaticProps func");
  const resp = await getMovie(params.id);
  return {
    props: {
      movie: resp.data,
    },
  };
}

// 该函数用于得到有哪些可能出现的id
export async function getStaticPaths() {
  const resp = await getMovies();
  const paths = resp.data.map((m) => ({
    params: {
      id: m._id,
    },
  }));
  console.log(" Run getStaticPaths ");
  return {
    paths,
    isFallback: true,
  };
}

