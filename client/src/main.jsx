import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter ,Route,RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Layout from './layout.jsx'
import SignInPage from './pages/authPages/SignInPage.jsx'
import DashboardPage from './pages/channelPages/DashboardPage.jsx'
import NotFound from './pages/errorPages/NotFound.jsx'
import SignUpPage from './pages/authPages/SignUpPage.jsx'
import ChannelPage from './pages/channelPages/ChannelPage.jsx'
import ChannelSettingsPage from './pages/channelPages/ChannelSettingsPage.jsx'
// import VideoGallery from './components/gallery/VideoGallery.jsx'
import HomePage from './pages/HomePage.jsx'
import LikedVideosPage from './pages/LikedVideosPage.jsx'
import  MyContentPage from './pages/MyContentPage.jsx'
import  SubscriptionsPage from './pages/SubscriptionsPage.jsx'
import  WatchHistoryPage from './pages/WatchHistoryPage.jsx'
import  PlaylistsPage from './pages/PlaylistsPage.jsx'
import  SubscribersPage from './pages/SubscribersPage.jsx'
import PlayListGallery from './components/gallery/PlayListGallery.jsx'
import TweetGallery from './components/gallery/TweetGallery.jsx'
import SingleVideoPage from './pages/videoPages/SingleVideoPage.jsx'
import ScrollableVideoGallery from './components/gallery/ScrollableVideoGallery.jsx'
import ProtectedPage from './pages/ProtectedPage.jsx'

// redux persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'

// channel  pages
import ChannelVideosPage from './pages/channelPages/ChannelVideosPage.jsx'
import ChannelSubscribedPage from './pages/channelPages/ChannelSubscribedPage.jsx'
import ChannelPlayListsPage from './pages/channelPages/ChannelPlayListsPage.jsx'
import PlayListDetailedPage from './pages/PlayListDetailedPage.jsx'
import ChangePasswordPage from './pages/channelPages/ChangePasswordPage.jsx'
import PersonalInfoPage from './pages/channelPages/PersonalInfoPage.jsx'
import ChannelInfoPage from './pages/channelPages/ChannelInfoPage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path : "/",
        element : <Layout />,
        children : [
          {
            path : "/home",
            element : <ProtectedPage authentication={true}><HomePage /></ProtectedPage>
          },
          {
            path : "/liked-videos",
            element : <ProtectedPage authentication={true}><LikedVideosPage /></ProtectedPage>
          },
          {
            path : "/my-content",
            element : <ProtectedPage ><MyContentPage /></ProtectedPage>
          },
          {
            path : "/subscriptions",
            element : <ProtectedPage><SubscriptionsPage /></ProtectedPage>
          },
          {
            path : "/watch-history",
            element : <ProtectedPage><WatchHistoryPage /></ProtectedPage>
          },
          {
            path : "/playlists",
            element : <ProtectedPage><PlaylistsPage /></ProtectedPage>
          },
          {
            path : "/subscribers",
            element : <ProtectedPage><SubscribersPage /></ProtectedPage>
          },
          // channel settings routes
          {
            path : "/channel-settings",
            element : <ProtectedPage><ChannelSettingsPage /></ProtectedPage>,
            children : [
              {
                path : "/channel-settings/personal-info",
                element : <ProtectedPage> <PersonalInfoPage /> </ProtectedPage>
                // element : <SignInPage/>
              },
              {
                path : "/channel-settings/channel-info",
                element : <ProtectedPage> <ChannelInfoPage /> </ProtectedPage>
              },
              {
                path : "/channel-settings/change-password",
                element : <ProtectedPage> <ChangePasswordPage /> \ </ProtectedPage>
              },
            ]
          },
          // channel profile routes
          {
            path : "/channel-profile/:channelId",
            element : <ProtectedPage><ChannelPage /></ProtectedPage>,
            children : [
              {
                path : "/channel-profile/:channelId/videos",
                element : <ChannelVideosPage />
              },
              {
                path : "/channel-profile/:channelId/play-lists",
                element : <ChannelPlayListsPage />
              },
              {
                path : "/channel-profile/:channelId/tweets",
                element : <TweetGallery />
              },
              {
                path : "/channel-profile/:channelId/subscribed-channels",
                element : <ChannelSubscribedPage />
                // element : <SubcsriberProfilesGallery />
              },
            ]
          },
          {
            path : "/playlist/:playlistId",
            element : <ProtectedPage><PlayListDetailedPage /></ProtectedPage>
          }
        ]
      },

      // non-layout routes  [ without SideBar ]

      {
        path : "/signup",
        element : <SignUpPage/>
      },
      {
        path : "/signin",
        element : <SignInPage/>
      },
      {
        path : "/dashboard",
        element : <ProtectedPage><DashboardPage/></ProtectedPage>
      },
      // not a protected route
      {
        path : "/watch/:videoId",
        element : <SingleVideoPage/>
      },

      // error page route NotFound 404
      {
        path : "*",
        element : <NotFound />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
