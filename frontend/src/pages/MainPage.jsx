import React from 'react'
import Headingimg from '/images/img1.jpg';
import Heading from '../components/Heading';
import TextCenter from '../components/TextCenter';
import TextComponent from '../components/TextComponent';
import OptionComponent from '../components/OptionComponent';
import Testimonials from '../components/testimonials';
import Questions from '../components/QuestionsComponent';
import Divider from '../components/atoms/Divider';
import DividerLine from '../components/atoms/DividerLine';
import ImgComponent from '../components/ImgComponent';
import ImgComponentCover from '../components/ImgComponentCover';
const MainPage = () => {
  return (



    <div>
      <Heading
        title="Master Japanese Kana Fast: Interactive Quizzes, Instant Rewards"
        text="Select characters you haven't mastered yet and embark on an engaging learning journey with interactive quizzes, writing practice, and real-time feedback to accelerate your progress."
        buttonText="Start Practice"
        imageSrc={Headingimg}
        onButtonClick={() => console.log('Start Practice clicked')}
      />
        {/* <TextCenter
            title="Interactive Learning"
            text="Experience a dynamic and engaging way to learn kana with interactive quizzes and writing practice."
        /> */}


        <TextComponent
            title="Real-time Feedback"
            text="Receive instant feedback on your progress and performance to help you improve faster."
        />


        <OptionComponent 
            title="Explore Our Features"
            text="Discover the unique features that make our platform the best choice for mastering kana."
        />


        <Testimonials/>  
       < ImgComponentCover />
 
        <DividerLine  margin="10rem 0" />
        <Questions/>  
        <DividerLine  margin="10rem 0" />
       <ImgComponent />  
       
       <DividerLine  margin="10rem 0" />
   </div>



  )
}

export default MainPage