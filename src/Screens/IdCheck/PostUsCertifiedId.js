import React from 'react';
import { View } from 'react-native';
import { Content, Text } from 'native-base';
import { sg } from 'src/Styles';

const PostUsCertifiedId = () => (
  <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
    <View style={[sg.spaceBetween]}>
      <View>
        <Text style={sg.formHeading}>Post us Certified ID</Text>
        <Text style={[sg.fS17, sg.mB5]}>Please send us your certified ID to:</Text>
        <Text style={[sg.textBold, sg.mB5, sg.fS18]}>Future Renewables Fund</Text>
        <Text style={[sg.textBold, sg.mB5, sg.fS18]}>GPO Box 1858</Text>
        <Text style={[sg.textBold, sg.mB15, sg.fS18]}>Sydney NSW 2001</Text>
      </View>
      <View>
        <Text style={[sg.fS10, sg.mT10]}>
          All documents must be provided in a certified copy format – in other words, a copy of the
          original document that has been certified by an eligible certifier.
        </Text>

        <Text style={[sg.fS10, sg.mT10]}>
          A ‘certified extract’ means an extract that has been certified as a true copy of some of
          the information contained in a complete original document by one of the persons described
          below.
        </Text>

        <Text style={[sg.fS10, sg.mT10]}>
          Please note that we require the copy which was actually signed by the certifier (i.e. the
          original penned signature of the certifier).
        </Text>
        <Text style={[sg.fS10, sg.mT10, sg.textBold]}>
          People who can certify documents or extracts are:
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>
          1. A lawyer, being a person who is enrolled on the roll of the Supreme Court of a State or
          Territory, or the High Court of Australia, as a legal practitioner (however described).
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>2. A judge of a court.</Text>
        <Text style={[sg.fS10, sg.mT5]}>3. A magistrate.</Text>
        <Text style={[sg.fS10, sg.mT5]}>4. A chief executive officer of a Commonwealth court.</Text>
        <Text style={[sg.fS10, sg.mT5]}>5. A registrar or deputy registrar of a court.</Text>
        <Text style={[sg.fS10, sg.mT5]}>6. A Justice of the Peace.</Text>

        <Text style={[sg.fS10, sg.mT5]}>
          7. A notary public (for the purposes of the Statutory Declaration Regulations 1993).
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>8. A police officer.</Text>

        <Text style={[sg.fS10, sg.mT5]}>
          9. An agent of the Australian Postal Corporation who is in charge of an office supplying
          postal services to the public.
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>
          10. A permanent employee of the Australian Postal Corporation with 2 or more years of
          continuous service who is employed in an office supplying postal services to the public.
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>
          11. An Australian consular officer or an Australian diplomatic officer (within the meaning
          of the Consular Fees Act 1955).
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>
          12. An officer with 2 or more continuous years of service with one or more financial
          institutions (for the purposes of the Statutory Declaration Regulations 1993).
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>
          13. A finance company officer with 2 or more continuous years of service with one or more
          financial companies (for the purposes of the Statutory Declaration Regulations 1993).
        </Text>
        <Text style={[sg.fS10, sg.mT5]}>
          14. An officer with, or authorised representative of, a holder of an Australian financial
          services licence, having 2 or more continuous years of service with one or more licensees.
        </Text>
        <Text style={[sg.fS10, sg.mT5, sg.mB25]}>
          15. A member of the Institute of Chartered Accountants in Australia, CPA Australia or the
          National Institute of Accoun- tants with 2 or more years of continuous membership.
        </Text>
      </View>
    </View>
  </Content>
);

export default PostUsCertifiedId;
