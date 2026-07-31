/**
 * GitHub Pages 설정
 *
 * ★ 설문이 시트에 안 쌓이면 여기 URL이 비어 있거나 잘못된 겁니다.
 *
 * 1) Apps Script → 배포 → 웹 앱 → URL 복사 (/exec 로 끝남)
 * 2) 아래 따옴표 안에 붙여넣기
 * 3) GitHub에 다시 올린 뒤 새로고침
 */
window.SURVEY_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbxldnyr1_un9nc0MqRpdVdcyLgy_RmkptRYGPJ7zcEbeOlYTNfHtoq0EVneDwhXusbv/exec";

/** 굿즈용 SNS 팔로우 링크 (아무거나 하나) */
window.FOLLOW_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/ndff_official/"
  },
  {
    id: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/share/1DaUhNE8ci/?mibextid=wwXIfr"
  },
  {
    id: "youtube",
    label: "YouTube",
    url: "https://youtube.com/@ndff_official?si=onH7CEjHVGrEv2xq"
  },
  {
    id: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@ndff_official?is_from_webapp=1&sender_device=pc"
  }
];

/** 에셋 폴더 (보통 수정 불필요) */
window.ASSET_BASE = "assets/";
