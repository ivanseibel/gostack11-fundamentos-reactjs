import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  async function handleUpload(): Promise<void> {
    try {
      setUploading(true);

      const uploads = uploadedFiles.map(uf => {
        const data = new FormData();
        data.append('file', uf.file);

        return api.post('transactions/import', data);
      });

      await Promise.all(uploads);

      setTimeout(() => {
        setUploading(false);
      }, 2000);
      setUploadedFiles([]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response.error);
      setUploading(false);
    }
  }

  function submitFile(files: File[]): void {
    const uf: FileProps[] = [];
    for (let index = 0; index < files.length; index += 1) {
      uf.push({
        file: files[index],
        name: files[index].name,
        readableSize: `${files[index].size} bytes`,
      });
    }
    setUploadedFiles(uf);
  }

  return (
    <>
      <Header size="small" selected="import" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              {uploading ? (
                <Loader
                  color="#fff"
                  width={15}
                  height={15}
                  type="BallTriangle"
                />
              ) : (
                'Enviar'
              )}
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
