'use client'

export default function Home({children}) {
  return (
    <div style={{marginTop: 50}}>
    <header className="bg-dark py-5">
        <div className="container px-5">
            <div className="row gx-5 align-items-center">
                <div className="col-xl-5 col-xxl-6 d-none d-xl-block">
                    <img className="img-fluid rounded-3 my-5" src="https://www.geracaoimoveis.com.br/foto_/2022/11178/sao-jose-dos-campos-casa-condominio-condominio-residencial-alphaville-ii-23-05-2024_14-27-13-16.webp" alt="..." />
                </div>
                <div className="col-lg-8 col-xl-7 col-xxl-6">
                    <div className="my-5 text-center text-xl-start">
                        <h1 className="display-5 fw-bolder text-white mb-2">Casa em Jacarépagua</h1>
                        <p className="lead fw-normal text-white-50 mb-4">Quer comprar a casinha dos seus sonhos?</p>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                            <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Agende sua visita</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</div>
  );
}
