// import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default ()=>{
    const router = useRouter();
    return (
        <ul>
            <li>
                <Link href="/"><a>Home</a></Link>
            </li>
            
            {/* <li>
                <Link href="/music"><a>Music</a></Link>
            </li> */}

            <li>
                <Link href="/movies"><a>Movie</a></Link>
            </li>

            {/* <li>
                <Link href="/movies/[:id]" as="/movies/2">
                <a>Movie of Detail </a>
                </Link>
            </li> */}

            <li>
                <button onClick={()=>{
                    router.push("/movies/[...params]","/movies/a/s/c")
                }}
                >To [...params].jsx</button>
            </li>
        </ul>
    )
}
