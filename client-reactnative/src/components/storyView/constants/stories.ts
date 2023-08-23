const stories = [
  {
    id: 1,
    username: 'Alane',
    allIsViewed: true,
    title: 'Albums',
    profile:
      'https://wallpaperswide.com/download/aquaman_movie_jason_momoa-wallpaper-480x640.jpg',
    stories: [
      {
        id: 1,
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video',
        duration: 17,
        isReadMore: true,
        storyId: 1,
        isSeen: false
      },
      {
        id: 2,
        url: 'https://i.pinimg.com/originals/8e/27/58/8e2758477b11d7c44d8defe9bf08ffb6.jpg',
        type: 'image',
        duration: 4,
        isReadMore: true,
        storyId: 1,
        isSeen: false
      },
      {
        id: 3,
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        duration: 15,
        isReadMore: true,
        storyId: 1,
        isSeen: false
      }
    ]
  },
  {
    id: 2,
    username: 'Weekend',
    allIsViewed: false,
    profile: "https://images.static-bluray.com/products/20/76129_5_front.jpg",
    title: 'Album Launch',
    stories: [
      {
        id: 0,
        url: 'https://i.scdn.co/image/ab67616d0000b273e7f02e8d0f955f39758186ae',
        type: 'image',
        duration: 5,
        isReadMore: true,
        storyId: 2,
        isSeen: false
      },
      {
        id: 1,
        url: 'https://static.wixstatic.com/media/f7b73f_4749adcf2ece4708889c960d1da3fda6~mv2_d_1800_1800_s_2.png/v1/fill/w_1800,h_1800,al_c,q_90/file.jpg',
        type: 'image',
        duration: 10,
        isReadMore: true,
        storyId: 2,
        isSeen: false
      }
    ]
  },
  {
    id: 3,
    username: 'Selena',
    allIsViewed: true,
    profile:"https://images.hdqwalls.com/download/optimus-prime-transformers-the-last-knight-5k-2a-1080x2280.jpg",
    title: 'Albums',
    stories: [
      {
        id: 0,
        url: 'https://static.wikia.nocookie.net/selenagomez/images/c/c4/Stars_Dance_Standard.jpg/revision/latest?cb=20160510194715',
        type: 'image',
        duration: 5,
        isReadMore: true,
        storyId: 3,
        isSeen: false
      },
      {
        id: 1,
        url: 'https://akns-images.eonline.com/eol_images/Entire_Site/202336/rs_1028x1024-230406133109-Hollywood_record_label.png?fit=around%7C1028:1024&output-quality=90&crop=1028:1024;center,top',
        type: 'image',
        duration: 10,
        isReadMore: true,
        storyId: 3,
        isSeen: false
      }
    ]
  },
  {
    id: 4,
    username: 'Shakira',
    allIsViewed: false, 
    profile: "https://images.wallpapersden.com/image/download/the-witcher-4k_a2xsa2yUmZqaraWkpJRobWVlrWpraGU.jpg",
    title: 'Albums',
    stories: [
      {
        id: 0,
        url: 'https://i.discogs.com/xCYSQK3tBLUJqmoqi08VLPBCIPMX1J-TKSaohDaOwFc/rs:fit/g:sm/q:90/h:491/w:486/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ3NDM3/MjAtMTM3NDA5ODE4/Ny05MDYyLmpwZWc.jpeg',
        type: 'image',
        duration: 5,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      },
      {
        id: 1,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-amD7xS8_-BzQbfUSRiPx8ciTEg34PMJpfg&usqp=CAU',
        type: 'image',
        duration: 10,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      }
    ]
  },
  {
    id: 5,
    username: "K'naan",
    allIsViewed: false,
    profile:
      'https://marvelnewsdesk.com/wp-content/uploads/2023/02/Kang__scaled_800.jpg',
    title: 'Single Album',
    stories: [
      {
        id: 0,
        url: 'https://cdns-images.dzcdn.net/images/cover/1fc68087a940ef86d9c304e39e6fa4c5/500x500.jpg',
        type: 'image',
        duration: 5,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      }
    ]
  },
  {
    id: 6,
    username: 'donald',
    allIsViewed: false,
    profile:
      'https://wallpapercave.com/wp/wp5529473.jpg',
    title: 'Albums',
    allStories: false,
    stories: [
      {
        id: 0,
        url: 'https://i.discogs.com/xCYSQK3tBLUJqmoqi08VLPBCIPMX1J-TKSaohDaOwFc/rs:fit/g:sm/q:90/h:491/w:486/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ3NDM3/MjAtMTM3NDA5ODE4/Ny05MDYyLmpwZWc.jpeg',
        type: 'image',
        duration: 5,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      },
      {
        id: 1,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-amD7xS8_-BzQbfUSRiPx8ciTEg34PMJpfg&usqp=CAU',
        type: 'image',
        duration: 10,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      }
    ]
  },
  {
    id: 7,
    username: 'james dark',
    allIsViewed: false,
    profile:
      'https://www.mordeo.org/files/uploads/2023/02/Ant-man-And-The-Wasp-Quantumania-2023-Movie-Poster-4K-Ultra-HD-Mobile-Wallpaper.jpg',
    title: 'Albums',
    allStories: false,
    stories: [
      {
        id: 0,
        url: 'https://i.discogs.com/xCYSQK3tBLUJqmoqi08VLPBCIPMX1J-TKSaohDaOwFc/rs:fit/g:sm/q:90/h:491/w:486/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ3NDM3/MjAtMTM3NDA5ODE4/Ny05MDYyLmpwZWc.jpeg',
        type: 'image',
        duration: 5,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      },
      {
        id: 1,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-amD7xS8_-BzQbfUSRiPx8ciTEg34PMJpfg&usqp=CAU',
        type: 'image',
        duration: 10,
        isReadMore: true,
        storyId: 4,
        isSeen: false
      }
    ]
  },
];

export default stories;
