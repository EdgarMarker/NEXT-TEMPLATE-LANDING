import React from "react";
import { createContract } from "../common/utils/helper-contract";
import { getCompanyData } from "../_domain/services/company.services";
import { CompanyModel } from "../_domain/model/company.model";
import CustomPortableText from "../common/components/text/CustomPortableText";

const page = async () => {
  const data = await createContract(getCompanyData, CompanyModel);
  if (!data) return null;
  return (
    <section className="section__policy">
      <div className="column__1">
        <CustomPortableText
          hasImg={false}
          data={data.policy.list_block_post_policy_privacyNotice}
        />
      </div>
    </section>
  );
};

export default page;
