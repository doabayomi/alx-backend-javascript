export default function loadBalancer(chinaDownload, USDownload) {
  Promise.race([chinaDownload, USDownload])
    .then((value) => value);
}
