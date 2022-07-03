import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TippyHeadless from "@tippyjs/react/headless";
import clsx from "clsx";
import axios from "axios";
import "~/components/Media/Media.scss";
import "./Player.scss";

import Icon from "~/components/Icon";
import ArtistName from "~/components/ArtistName";
import { playerActions } from "~/stores/playerSlice";
import { uiActions } from "~/stores/uiSlice";

import { fetchSong, fetchStreaming } from "~/apiServices/playerServices";
import { queueActions } from "~/stores/queueSlice";
import { Spinner } from "~/assets/icons";
import Media from "~/components/Media";

import { PlayerMediaMenu } from "~/components/Menus";
import useToast from "~/components/Toast";

const Player = () => {
  const $ = document.querySelector.bind(document);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isPlaying, volume, source, isFetching, autoplay } = useSelector(
    (state) => state.player
  );
  const { user } = useSelector((state) => state.auth);
  const { items, currentSongId, shuffle, repeatStatus, currentIndex, idList } =
    useSelector((state) => state.queue);
  const { showQueue } = useSelector((state) => state.ui);

  const [like, setLike] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatTippyText, setRepeatTippyText] = useState("Bật phát lại tất cả");
  const [data, setData] = useState(items[currentSongId]);

  useEffect(() => {
    const audio = $(".player-audio");
    switch (repeatStatus) {
      case 0:
        setRepeatTippyText("Bật phát lại tất cả");
        audio.loop = false;
        break;
      case 1:
        setRepeatTippyText("Bật phát lại một bài");
        audio.loop = false;
        break;
      case 2:
        setRepeatTippyText("Tắt phát lại");
        audio.loop = true;
        break;
      default:
        setRepeatTippyText("Bật phát lại tất cả");
    }
  }, [repeatStatus]);
  useEffect(() => {
    const audio = $(".player-audio");
    audio.muted = false;
  }, []);
  useEffect(() => {
    dispatch(playerActions.pauseMusic());
  }, []);

  useEffect(() => {
    const fetchAudio = async () => {
      dispatch(
        playerActions.setFetchingStatus({
          isFetching: true,
          fetchingStatus: "pending",
        })
      );
      const result = await fetchStreaming(currentSongId);
      dispatch(playerActions.updateSource(result["128"]));
      dispatch(
        playerActions.setFetchingStatus({
          isFetching: false,
          fetchingStatus: "completed",
        })
      );
    };
    fetchAudio();

    {
      !!user &&
        axios
          .put(
            `http://localhost:8800/api/user/${user._id}/recentSongs`,
            { songId: currentSongId, action: "add" },
            {
              headers: {
                token: `Bearer ${user.accessToken}`,
              },
            }
          )
          .then((res) => res.data)
          .catch((error) => console.log(error));
    }
  }, [currentSongId]);

  useEffect(() => {
    if (autoplay) {
      dispatch(playerActions.playMusic());
    }
  }, [source]);

  useEffect(() => {
    setData(items[currentSongId]);
  }, [items, currentSongId]);

  useEffect(() => {
    const audio = $(".player-audio");
    const prevBtn = $(".player-btn.prev");
    const nextBtn = $(".player-btn.next");
    const playBtn = $(".player-btn.play");
    const volumeInput = $(".player-volume-bar");
    const process = $(".player-process-bar");
    volumeInput.oninput = (e) => {
      dispatch(playerActions.setVolume(+e.target.value));
    };
    process.oninput = (e) => {
      if (audio.duration) {
        const seekTime = (e.target.value * audio.duration) / 100;
        audio.currentTime = seekTime;
      }
    };
    nextBtn.onclick = () => {
      dispatch(playerActions.pauseMusic());
      dispatch(queueActions.next());
      dispatch(playerActions.setAutoplay(true));
    };
    prevBtn.onclick = () => {
      dispatch(playerActions.pauseMusic());
      dispatch(queueActions.prev());
      dispatch(playerActions.setAutoplay(true));
    };

    playBtn.onclick = () => {
      if (audio.paused) {
        dispatch(playerActions.playMusic());
      } else {
        dispatch(playerActions.pauseMusic());
      }
    };

    audio.ontimeupdate = function () {
      setCurrentTime(this.currentTime);
      process.value = (this.currentTime / this.duration) * 100;
    };
    audio.onended = function () {
      if (
        repeatStatus === 1 ||
        (repeatStatus === 0 && currentIndex !== idList.length - 1)
      ) {
        dispatch(playerActions.pauseMusic());
        nextBtn.click();
      }
    };
  }, []);

  //mute && unmute && adjust volume level
  useEffect(() => {
    const volumeBtn = $(".player-btn.volume");
    const audio = $(".player-audio");
    volumeBtn.onclick = () => {
      if (volume === 0) {
        dispatch(playerActions.setVolume(20));
      } else {
        dispatch(playerActions.setVolume(0));
      }
    };
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = $(".player-audio");

    if (isPlaying) {
      audio.play();
      dispatch(
        playerActions.setFetchingStatus({
          isFetching: false,
          fetchingStatus: null,
        })
      );
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  const handleToggleShuffle = () => {
    dispatch(queueActions.toggleShuffle());
  };
  const changeRepeatMode = () => {
    dispatch(queueActions.updateRepeatStatus());
  };
  const handleToggleQueueBtn = () => {
    dispatch(uiActions.toggleQueue());
  };
  const handleLikeSong = () => {
    setLike((prev) => !prev);
    if (like) {
      toast("Đã xóa bài hát khỏi thư viện");
    } else {
      toast("Đã thêm bài hát vào thư viện");
    }
  };
  const formatTime = (time) => {
    return (
      `${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(time % 60)
        .toString()
        .padStart(2, "0")}` || 0
    );
  };

  return (
    <div className="player">
      <div className="player-wrapper">
        <div className="player-left">
          <div className="media">
            <div className="media-img">
              <img
                src={data?.thumbnail}
                alt={data?.title}
                className="media-thumbnail"
              />
            </div>
            <div className="media-info">
              <h4 className="media-name">{data?.title}</h4>
              <p className="media-singers">
                {data?.artists ? (
                  data?.artists.map((artist, index) => (
                    <span key={index}>
                      <ArtistName artist={artist} />
                      {index < data?.artists.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span>{data?.artistsNames ? data?.artistsNames : ""}</span>
                )}
              </p>
            </div>
            <div className="media-actions">
              <Icon
                placement="top"
                content={like ? "Xoá khỏi thư viện" : "Thêm vào thư viện"}
                size={32}
                iconSize={16}
                hover="bright"
                className="hide-on-mobile"
                space={4}
                onClick={handleLikeSong}
              >
                {like ? (
                  <i className="ic-like-full"></i>
                ) : (
                  <i className="ic-like"></i>
                )}
              </Icon>

              <TippyHeadless
                trigger="click"
                placement="right-start"
                appendTo={() => document.body}
                interactive={true}
                hideOnClick={true}
                render={(attrs) => (
                  <div className="box" tabIndex="-1" {...attrs}>
                    <PlayerMediaMenu item={data} />
                  </div>
                )}
              >
                <Icon
                  size={32}
                  iconSize={16}
                  hover="bright"
                  placement="top"
                  content="Xem thêm"
                  space={4}
                  className="hide-on-tablet-mobile"
                >
                  <i className="ic-more"></i>
                </Icon>
              </TippyHeadless>
            </div>
          </div>
        </div>

        <div className="player-center">
          <div className="player-control">
            <Icon
              size={32}
              iconSize={16}
              hover="bright"
              placement="top"
              hideOnClick={false}
              className={clsx(
                "player-btn",
                "random",
                shuffle && "active",
                "hide-on-mobile"
              )}
              content={shuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}
              space={14}
              onClick={handleToggleShuffle}
            >
              <i className="ic-shuffle"></i>
            </Icon>
            <Icon
              size={32}
              iconSize={16}
              hover="bright"
              space={14}
              visible={false}
              className="player-btn prev hide-on-mobile"
            >
              <i className="ic-pre"></i>
            </Icon>
            <button className="player-btn play">
              {!isFetching && isPlaying && (
                <i className="ic-pause-circle-outline player-icon"></i>
              )}
              {!isFetching && !isPlaying && (
                <i className="ic-play-circle-outline player-icon"></i>
              )}
              {isFetching && (
                <span className="player-spinner is-circle">
                  <Spinner />
                </span>
              )}
            </button>
            <TippyHeadless
              placement="top"
              hideOnClick={false}
              arrow={true}
              render={(attrs) => (
                <div
                  className="tippy-box player-next-song"
                  tabIndex="-1"
                  {...attrs}
                >
                  <span className="player-next-song-title">Phát tiếp theo</span>
                  <Media
                    item={items[idList[currentIndex + 1]] || items[idList[0]]}
                  />
                  <div
                    className="tippy-arrow"
                    data-popper-arrow="tippy-6"
                  ></div>
                </div>
              )}
            >
              <Icon
                className="player-btn next hide-on-mobile"
                size={32}
                iconSize={16}
                space={7}
                hover="bright"
              >
                <i className="ic-next"></i>
              </Icon>
            </TippyHeadless>
            <Icon
              size={32}
              iconSize={16}
              hover="bright"
              placement="top"
              hideOnClick={false}
              content={repeatTippyText}
              space={14}
              className={clsx(
                "player-btn",
                repeatStatus > 0 && "active",
                "hide-on-mobile"
              )}
              onClick={changeRepeatMode}
            >
              {repeatStatus < 2 && <i className="ic-repeat"></i>}
              {repeatStatus === 2 && <i className="ic-repeat-one"></i>}
            </Icon>
          </div>
          <div className="player-process hide-on-mobile">
            <span className="player-current-time">
              {data && formatTime(currentTime)}
            </span>
            <input
              type="range"
              className="player-process-bar"
              min={0}
              max={100}
              step={0.1}
              value={data ? (currentTime * 100) / data?.duration : 0}
              style={{
                backgroundSize: `${
                  data ? (currentTime * 100) / data?.duration : 0
                }%`,
              }}
            />
            <span className="player-song-length">
              {data && formatTime(data?.duration)}
            </span>
          </div>
        </div>
        <div className="player-right">
          <Icon
            className="player-btn hide-on-mobile"
            size={36}
            iconSize={20}
            space={4}
            hover="bright"
            placement="top"
            disabled={true}
            content={"Xem MV"}
          >
            <i className="ic-mv"></i>
          </Icon>
          <Icon
            className="player-btn  hide-on-mobile"
            size={32}
            iconSize={16}
            space={4}
            hover="bright"
            placement="top"
            content={"Xem lời bài hát"}
            disabled
          >
            <i className="ic-karaoke"></i>
          </Icon>
          <Icon
            className="player-btn hide-on-mobile"
            size={32}
            iconSize={16}
            space={4}
            hover="bright"
            placement="top"
            content={"Chế độ cửa sổ"}
          >
            <i className="ic-restore"></i>
          </Icon>

          <div className={`player-volume hide-on-mobile`}>
            <Icon
              className="player-btn volume"
              size={32}
              iconSize={16}
              space={4}
              hover="bright"
              placement="top"
              visible={false}
            >
              {volume === 0 ? (
                <i className="ic-volume-mute"></i>
              ) : (
                <i className="ic-volume"></i>
              )}
            </Icon>

            <div className="player-volume-wrapper">
              <input
                type="range"
                className="player-volume-bar"
                min={0}
                max={100}
                step={0.1}
                value={volume}
                style={{
                  backgroundSize: `${volume}%`,
                }}
              />
            </div>
          </div>
          <Icon
            className={clsx("player-btn", "playlist", showQueue && "active")}
            size={30}
            iconSize={16}
            space={4}
            hover="bright"
            placement="top"
            content={"Danh sách phát"}
            onClick={handleToggleQueueBtn}
          >
            <i className="ic-list-music"></i>
          </Icon>
        </div>
        <audio className="player-audio" muted preload="auto" src={source} />
      </div>
    </div>
  );
};

export default Player;
