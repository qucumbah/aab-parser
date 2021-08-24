import * as fs from 'fs';
import * as path from 'path';
import JSZip, * as jszip from 'jszip';
import * as protobuf from 'protobufjs';

type Manifest = {
  versionCode: number,
  versionName: string,
  packageName: string,
  compiledSdkVersion: number,
  compiledSdkVersionCodename: number,
};

export async function parseAabManifest(file: string | Buffer): Promise<Manifest> {
  const manifestJson = await parseAabManifestJSON(file);

  type Attribute = {
    name: string,
    value: string,
  };
  const getAttribute = (name: string): string => {
    const attribute: Attribute = (
      manifestJson.element.attribute.find((attribute: Attribute) => attribute.name === name)
    );
    return attribute.value;
  };
  const getNumberAttribute = (name: string): number => Number(getAttribute(name));

  return {
    versionCode: getNumberAttribute('versionCode'),
    versionName: getAttribute('versionName'),
    packageName: getAttribute('package'),
    compiledSdkVersion: getNumberAttribute('compileSdkVersion'),
    compiledSdkVersionCodename: getNumberAttribute('compileSdkVersionCodename'),
  };
}

export async function parseAabManifestJSON(file: string | Buffer): Promise<any> {
  const fileBuffer: Buffer = (typeof file === 'string') ? await fs.promises.readFile(file) : file;
  const archive: JSZip = await jszip.loadAsync(fileBuffer);

  const manifestFile: Buffer | undefined = (
    await archive.file('base/manifest/AndroidManifest.xml')?.async('nodebuffer')
  );

  if (manifestFile === undefined) {
    throw new Error('Could not find AndroidManifest.xml file inside the app bundle file');
  }

  const XmlNode: protobuf.Type = getXmlNodeProtobufType();
  const decodedManifest = XmlNode.decode(manifestFile);
  const decodedManifestJson = decodedManifest.toJSON();

  return decodedManifestJson;
}

function getXmlNodeProtobufType(): protobuf.Type {
  const root = protobuf.loadSync(path.join(__dirname, './Resources.proto'));
  const XmlNode = root.lookupType('aapt.pb.XmlNode');
  return XmlNode;
}
