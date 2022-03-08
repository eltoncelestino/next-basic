import { GetServerSideProps } from 'next';
import { GetStaticProps } from 'next';
// import { useState, useEffect } from 'react';

export default function Home({ repositories, date }) {
  // const [repositories, setRepositories] = useState<string[]>([])

  // useEffect(() => {
  //   fetch('https://api.github.com/users/eltoncelestino/repos')
  //   .then(response => response.json())
  //   .then(data => {
  //     const repositoryNames = data.map(item => item.name);
  //     setRepositories(repositoryNames)
  //   })
  // }, [])

  return (
    <>
      <h1>{date}</h1>
      <ul>
        {repositories.map(repo => <li key={repo}>{repo}</li>)}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/users/eltoncelestino/repos');
  
  const data = await response.json();
  const repositoryNames = data.map((item) => item.name);
  
  return{
    props: {
      repositories: repositoryNames,
      date: new Date().toISOString(),
    },
    revalidate: 60 * 60 * 4, //atualiza a cada 4 horas
  } 
}