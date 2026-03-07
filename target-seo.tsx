
// const TargetSeo = () => {

// 在SSR的页面上层容器增加一个target元素，保证宽高和内容足够大，这样就能人为的控制LCP稳定命中在这个元素
// const mountedHandle = useMounted()

// return {
//     .....
//     {mountedHandle ? null : (
//         <div
//           style={{
//             position: 'fixed',
//             height: '80%',
//             width: '80%',
//             opacity: 0.001,
//             overflow: 'hidden',
//             zIndex: -1,
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             textAlign: 'center',
//             whiteSpace: 'normal',
//             wordWrap: 'break-word',
//             fontSize: 50
//           }}
//           className="bigest-targer-seo"
//         >
//           <span>{formatMessage({ id: 'bigest-text' })}</span>
//         </div>
//       )}
//       .....
// }

// }