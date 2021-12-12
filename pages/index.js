import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';


function HomePage (props) {
  return (
  <Fragment>
   <Head> 
     <title>Py Meet</title>
     <meta name="description" content="Browse your favourite city " />
   </Head>
   <MeetupList meetups={ props.meetups } /> 
  </Fragment>
  
  );
        
}
export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://piyushyadav0191:yadav123456@cluster0.0aaiv.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
 
      const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

      client.close();

   return {
props: {
    meetups: meetups.map(meetup => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image ,
        description: meetup.data.description,
        id: meetup._id.toString(),
    })),
},
  revalidate: 1,
   };
}


export default HomePage;
