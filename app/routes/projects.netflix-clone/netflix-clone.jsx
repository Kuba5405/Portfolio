import { Footer } from '~/components/footer';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './netflix-clone.module.css';

const title = 'Free streaming service prototype';
const description =
  'To be Made';
const roles = ['User Research', 'UX Design', 'Interface Design'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const NetflixClone = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.netflix-clone}>
        <ProjectHeader
          title={title}
          description={description}
          url=""
          roles={roles}
        />
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
